import { getQuestions } from "@/server/db/faq";
import Qa from "./_components/qa";
import { Faq } from "@/lib/generated/prisma/client";
import Container from "@/components/layouts/Container";

const page = async () => {
  const questions = await getQuestions();
  const questionsTsx = questions.map((q: Faq) => {
    return <Qa qaObj={q} />;
  });
  return (
    <main className="mb-5">
      <Container>
        <h1>الأسئلة الشائعة</h1>
        <div>{questionsTsx}</div>
      </Container>
    </main>
  );
};

export default page;
