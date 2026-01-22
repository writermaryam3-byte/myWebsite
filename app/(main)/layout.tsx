
import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import Footer from "@/components/footer/Footer";
import Tweets from "@/components/Tweets/Tweets";



export const metadata: Metadata = {
  title: "أ/مريم المطيري",
  description: `مؤسس ومدير تنفيذي لـithrathakaa | مُتخصّصة بالموهبة |طالبة ماجستير تكنولوجيا التعليم |مدرّبة في الذكاءات المتعدّدة. | رسالتي: تسخير التقنية لإثراء المواهب`,
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialSession = await getServerSession(authOptions);

  return (
    <div className="flex flex-col">
        <Header initialSession={initialSession}/>
        {children}
        <Tweets/>
        <Footer/>
    </div>

  );
}
