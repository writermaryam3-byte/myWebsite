import { Status } from "@/lib/generated/prisma/enums";
import { db } from "@/lib/prisma";

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
    console.log(searchParams)
  const { token } = await searchParams;
console.log(token)
  if (!token) return <p>لينك غير صالح</p>;

  const user = await db.newsletter.findFirst({
    where: { token },
  });

  if (!user) return <p>لينك غير صالح أو منتهي</p>;

  await db.newsletter.update({
    where: { id: user.id },
    data: {
      status: Status.ACTIVE,
      token: null,
    },
  });
  return <h1>تم تفعيل اشتراكك بنجاح ✅</h1>;
}
