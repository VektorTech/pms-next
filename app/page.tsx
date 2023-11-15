import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default function Home() {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("session_id");
  if (jwtToken && jwtToken.value && process.env.JWT_SECRET) {
    const decoded = jwt.verify(
      jwtToken.value,
      process.env.JWT_SECRET
    ) as jwt.JwtPayload;
    if (decoded.type == "patient-user") {
      redirect("/patient");
    }
    redirect("/doctor");
  }
  redirect("/login");
}
