import z from "zod";

export const faqSchema = z.object({
  question: z.string("هذا الحقل مطلوب").trim(),
  answer: z
    .string({ error: "هذا الحقل مطلوب" }).trim()
});
