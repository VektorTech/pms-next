import { z } from "zod";
import { zfd } from "zod-form-data";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/src/prismaInstance";

const schema = zfd.formData({
  email: zfd.text(z.string().email()),
  password: zfd.text(),
});

export async function POST(request: Request) {
  const { email, password } = schema.parse(await request.formData());
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return Response.redirect(request.url.replace("/api", ""));
  }
  const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordMatch) {
    return Response.redirect(request.url.replace("/api", ""));
  }
  const patientUser = await prisma.patient.findUnique({
    where: { userId: user.id },
  });
  const jwtToken = jwt.sign(
    {
      user_id: user.id,
      email,
      type: patientUser ? "patient-user" : "doctor-user",
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );
  const newLocation = !!patientUser ? "/patient" : "/doctor";
  return Response.json(
    { message: "Successful login" },
    {
      status: 302,
      headers: {
        Location: newLocation,
        "Set-Cookie": `session_id=${jwtToken}; Path=/; HTTPOnly; SameSite=Strict; Secure`,
      },
    }
  );
}
