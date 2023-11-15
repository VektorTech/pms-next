import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { zfd } from "zod-form-data";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const schema = zfd.formData({
  firstName: zfd.text(),
  lastName: zfd.text(),
  gender: zfd.text(z.string().regex(/^(FE)?MALE$/i)),
  dateOfBirth: zfd.text(z.string().regex(/^[0-9]{4}(-[0-9]{2}){2}$/)),
  address: zfd.text(),
  phone: zfd.numeric(),
  email: zfd.text(z.string().email()),
  password: zfd.text(),
});

export async function POST(request: Request) {
  console.log(process.env.JWT_SECRET);
  const {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    address,
    phone,
    email,
    password,
  } = schema.parse(await request.formData());
  const isRegistered = !!(await prisma.user.count({ where: { email } }));
  if (isRegistered) {
    return Response.json(
      { message: "User Already Registered. Please Login." },
      { status: 409 }
    );
  }
  const encryptPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email,
      passwordHash: encryptPassword,
      firstName,
      lastName,
      gender: gender.toUpperCase() as "MALE" | "FEMALE",
      dob: new Date(dateOfBirth),
      address,
      phone,
      ipAddress:
        request.headers.get("x-real-ip") ||
        request.headers.get("x-forwarded-for") ||
        "",
    },
  });
  await prisma.patient.create({
    data: {
      userId: newUser.id,
    },
  });
  const jwtToken = jwt.sign(
    { user_id: newUser.id, email, type: "patient-user" },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );
  return Response.json(
    { message: "Successfully created" },
    {
      status: 302,
      headers: {
        Location: "/patient",
        "Set-Cookie": `session_id=${jwtToken}; Path=/; HTTPOnly; SameSite=Strict; Secure`,
      },
    }
  );
}
