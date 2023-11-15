import { UserTokenPayload } from "@/src/types";
import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function confirmAdminUser() {
  try {
    const prisma = new PrismaClient();
    const cookieStore = cookies();
    const jwtToken = cookieStore.get("session_id");
    if (jwtToken && jwtToken.value && process.env.JWT_SECRET) {
      const decoded = verify(
        jwtToken.value,
        process.env.JWT_SECRET
      ) as UserTokenPayload;
      const user = await prisma.user.count({
        where: { id: decoded.user_id, role: "ADMIN" },
      });

      if (user) return;
    }
    redirect("/login");
  } catch (e) {
    redirect("/login");
  }
}
