import Container from "@/components/layouts/Container";

const page = async () => {
    const terms = ""
  return (
    <main className="mb-5">
      <Container>
        <h1>الشروط والاحكام</h1>
        <div>
            {terms}
        </div>
      </Container>
    </main>
  );
};

export default page;
