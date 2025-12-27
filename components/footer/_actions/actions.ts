"use server";

import { db } from "@/lib/prisma";
import { newsletterSchema } from "@/validations/newsletter";
import z from "zod";
import { Status } from "@/lib/generated/prisma/enums";
import sendEmail from "@/lib/sendEmails";

export const addToNewsletter = async (
  prvState: unknown,
  formData: FormData
) => {
  let validationRes = newsletterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validationRes.success)
    return {
      status: 400,
      error: z.flattenError(validationRes.error).fieldErrors,
      formData,
    };

  try {
    const token = crypto.randomUUID();

    const confirmUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/confirm?token=${token}`;

    await db.newsletter.upsert({
      where: {
        email: validationRes.data.email,
      },
      update: {
        status: Status.PENDING,
        token,
      },
      create: {
        email: validationRes.data.email,
        phone: validationRes.data.phone,
        status: Status.PENDING,
        token,
      },
    });
    const res = await sendEmail({
      from: `support@${process.env.DOMAIN}`,
      to: validationRes.data.email,
      subject: `تاكيد البريد الالكتروني للاشتراك بالنشرة البريدية`,
      replyTo: validationRes.data.email,
      html: `
      <p>اضغط على الرابط لتأكيد الاشتراك:</p>
      <a href="${confirmUrl}">تأكيد الاشتراك</a>
    `,
    });
    if(!res.success)return{
        status: 500,
        message: "خطا بارسال الرسالة تواصل مع الدعم",
        formData
    }
    return {
      status: 201,
      message: "الرجاء مراجعة البريد الالكتروني لتفعيل الاشتراك",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "خطا غير معروف الرجاء التواصل مع الدعم",
    };
  }
};
