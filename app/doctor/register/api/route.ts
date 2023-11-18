import { z } from "zod";
import { zfd } from "zod-form-data";
import bcrypt from "bcryptjs";
import { prisma } from "@/src/prismaInstance";

const schema = zfd.formData({
  firstName: zfd.text(),
  middleName: zfd.text(),
  lastName: zfd.text(),
  specialty: zfd.text(),
  roomNo: zfd.numeric(),
  gender: zfd.text(z.string().regex(/^(FE)?MALE$/i)),
  dateOfBirth: zfd.text(z.string().regex(/^[0-9]{4}(-[0-9]{2}){2}$/)),
  address: zfd.text(),
  phone: zfd.numeric(),
  email: zfd.text(z.string().email()),
  password: zfd.text(),
});

export async function POST(request: Request) {
  const {
    firstName,
    middleName,
    lastName,
    specialty,
    gender,
    dateOfBirth,
    address,
    phone,
    roomNo,
    email,
    password,
  } = schema.parse(await request.formData());
  const isRegistered = !!(await prisma.user.count({ where: { email } }));
  if (isRegistered) {
    return Response.json(
      { message: "Doctor Already Registered." },
      { status: 409 }
    );
  }
  const encryptPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email,
      passwordHash: encryptPassword,
      firstName,
      middleName,
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
  await prisma.doctor.create({
    data: {
      userId: newUser.id,
      roomNo,
      specialty,
    },
  });
  if (process.env.VERCEL) prisma.$disconnect();
  return Response.json({ message: "Successfully created" });
}
