"use server";

import { Pages, Routes } from "@/app/types/enums";
import { db } from "@/lib/prisma";
import { faqSchema } from "@/validations/faq";
import { revalidatePath } from "next/cache";
import z from "zod";

export const addQuestion = async (prvState: unknown, formData: FormData) => {
  const validationRes = faqSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  console.log(validationRes)
  if (!validationRes.success) {
    return {
      status: 400,
      error: z.flattenError(validationRes.error).fieldErrors,
      formData,
    };
  }
  try {
   

    const question = await db.faq.create({
      data: {
        question: validationRes.data.question,
        answer: validationRes.data.answer
      }
    });
    revalidatePath(`${Routes.ADMIN}/${Pages.FAQ}`);
    revalidatePath(`${Routes.FAQ}`);
    return {
      status: 201,
      message: "تم اضافة السؤال بنجاح",
      question,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "حدث خطأ غير معروف الرجاء التواصل مع الدعم",
    };
  }
};
export const updateQuestion = async (
  qId: string,
  prvState: unknown,
  formData: FormData
) => {
  const validationRes = faqSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validationRes.success) {
    return {
      status: 400,
      error: z.flattenError(validationRes.error).fieldErrors,
      formData,
    };
  }
  try {
    const question = await db.faq.findUnique({
      where: {
        id: qId,
      },
    });

    if (!question)
      return {
        status: 400,
        message: "لا توجد سوال بهذه البيانات",
      };


    const updatedQuestion = await db.faq.update({
      where: {
        id: qId
      },
      data: {
        question: validationRes.data.question,
        answer: validationRes.data.answer
      }
    });
    revalidatePath(`${Routes.ADMIN}/${Pages.FAQ}`);
    revalidatePath(
      `${Routes.ADMIN}/${Pages.FAQ}/${Pages.EDIT}/${question.id}`
    );
    revalidatePath(`${Routes.FAQ}`);
    return {
      status: 200,
      message: "تم تحديث السؤال بنجاح",
      updatedQuestion,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "حدث خطأ غير معروف الرجاء التواصل مع الدعم",
    };
  }
};

export const deleteQuestion = async (
  qId: string,
  prvState: unknown,
  formData: FormData
) => {
  try {
    await db.faq.delete({
      where: {
        id: qId,
      },
    });
    revalidatePath(`${Routes.ADMIN}/${Pages.FAQ}`);
    revalidatePath(
      `${Routes.ADMIN}/${Pages.FAQ}/${Pages.EDIT}/${qId}`
    );
    revalidatePath(`${Routes.ROOT}`);
    revalidatePath(`${Routes.FAQ}`);

    return {
      message: "تم حذف السؤال بنجاح",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "حدث خطأ غير معروف الرجاء التواصل مع الدعم",
    };
  }
};
