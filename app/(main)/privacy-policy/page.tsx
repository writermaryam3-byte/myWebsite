import Container from "@/components/layouts/Container";

const page = async () => {
    const privacyPolicy = ""
  return (
    <main className="mb-5">
      <Container>
        <h1>سياسة الخصوصية</h1>
        <div>
            {privacyPolicy}
        </div>
      </Container>
    </main>
  );
};

export default page;
