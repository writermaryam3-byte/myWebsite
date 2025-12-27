import { db } from "@/lib/prisma";
import { cache } from "../cache";

export const getQuestions = cache(
    () => {
      const questions = db.faq.findMany();
      return questions;
    },
    ["faq"],
    { revalidate: 3600 }
  );

  export const getQuestionById = (id: string)=> cache(
    () => {
      return db.faq.findUnique({
          where: { id },
        });
    },
    ["question-by-id", id],
    { revalidate: 3600 }
  )();