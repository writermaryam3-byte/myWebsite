import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

import SiteSessionProvider from "./providers/SiteSessionProvider";
import ReduxProvider from "./providers/ReduxProvider";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "أ/مريم المطيري",
  description: `مؤسس ومدير تنفيذي لـithrathakaa | مُتخصّصة بالموهبة |طالبة ماجستير تكنولوجيا التعليم |مدرّبة في الذكاءات المتعدّدة. | رسالتي: تسخير التقنية لإثراء المواهب`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={` background antialiased`}>
        <ReduxProvider>
          <SiteSessionProvider>
            <ToastContainer
              position="top-center"
              autoClose={2500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={true}
              pauseOnFocusLoss
              draggable
              pauseOnHover={false}
              theme="dark"
            />
            {children}
          </SiteSessionProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
