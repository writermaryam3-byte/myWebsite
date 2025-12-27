import Form from "../_components/form";
import Container from "@/components/layouts/Container";
import { getArticleById } from "@/server/db/articles";
import { getCategories } from "@/server/db/category";
import { getQuestionById, getQuestions } from "@/server/db/faq";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const question = await getQuestionById(id);

  return (
    <main>
      <Container>
        <h1 className="text-3xl my-5">تعديل السؤال</h1>
        <Form question={question} />
      </Container>
    </main>
  );
};

export default page;
