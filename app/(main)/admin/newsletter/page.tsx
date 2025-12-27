import Container from "@/components/layouts/Container";
import { columns } from "./_components/columns";
import { DataTable } from "../_components/DataTable";
import { getNewsletterUsers } from "@/server/db/newsletter";



const NewsletterPage = async () => {
  const newsletterUsers = await getNewsletterUsers();
  return (
    <main>
      <section>
        <Container>
          <div>
            <div className="container mx-auto py-10">
              <DataTable columns={columns} data={newsletterUsers} />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default NewsletterPage;
