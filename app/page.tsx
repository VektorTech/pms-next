import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UserTokenPayload } from "@/src/types";

export default function Home() {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("session_id");
  if (jwtToken && jwtToken.value && process.env.JWT_SECRET) {
    jwt.verify(jwtToken.value, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        redirect("/login");
      }
      if ((decoded as UserTokenPayload).type == "patient-user") {
        redirect("/patient");
      }
      redirect("/doctor");
    });
    return;
  }
  redirect("/login");
}
