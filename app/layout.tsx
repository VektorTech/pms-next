import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { UserTokenPayload } from "@/src/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Central Medics",
  description: "Patient Management",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await verifyAuthUser();

  return (
    <html lang="en">
      <body className={inter.className + " flex flex-col"}>
        {user && (
          <header className="pb-12 w-full">
            <ul className="fixed px-5 w-full gap-x-4 h-12 flex items-center bg-sky-600 text-white">
              <li>
                <Link href="/">Central Medical</Link>
              </li>
              <li className="ml-auto">
                <Link href="/account">Account</Link>
              </li>
              <li>
                <a href="/logout/api">Logout</a>
              </li>
            </ul>
          </header>
        )}
        {children}
      </body>
    </html>
  );
}

function verifyAuthUser() {
  try {
    const cookieStore = cookies();
    const jwtToken = cookieStore.get("session_id");
    if (jwtToken && jwtToken.value && process.env.JWT_SECRET) {
      const decoded = verify(jwtToken.value, process.env.JWT_SECRET);
      return decoded as UserTokenPayload;
    }
    return null;
  } catch (e) {
    return null;
  }
}
