import Container from "@/components/layouts/Container";
import { DataTable } from "../_components/DataTable";
import { columns } from "./_components/columns";
import { Button } from "@/components/ui/button";
import Link from "@/components/link";
import { Pages, Routes } from "@/app/types/enums";
import { getQuestions } from "@/server/db/faq";

const AdminCoursePage = async () => {
  const questions = await getQuestions();
  return (
    <main>
      <section>
        <Container>
          <div>
            <Link href={`${Routes.ADMIN}/${Pages.FAQ}/${Pages.NEW}`}>
              <Button className="w-full my-4 cursor-pointer rounded-2xl bg-button">اضافة سؤالا جديدا</Button>
            </Link>
            <div className="mx-auto py-10">
              <DataTable columns={columns} data={questions} />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default AdminCoursePage;
