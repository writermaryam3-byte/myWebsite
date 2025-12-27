import z from "zod";

export const newsletterSchema = z.object({
  email: z.email("الرجاء ادخال بريد الكتروني صالح صالح"),
  phone: z
    .string({ error: "رقم الهاتف مطلوب" })
    .regex(/^[0-9]+$/, "رقم الهاتف يجب ان يحتوي أرقام فقط")
    .min(7, "رقم الهاتف غير صالح")
    .max(15, "رقم الهاتف غير صالح"),
});
