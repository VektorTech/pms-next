import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { zfd } from "zod-form-data";
import bcrypt from "bcryptjs";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { UserTokenPayload } from "@/src/types";

const prisma = new PrismaClient();

const schema = zfd.formData({
  firstName: zfd.text(),
  middleName: zfd.text(),
  lastName: zfd.text(),
  gender: zfd.text(z.string().regex(/^(FE)?MALE$/i)),
  dateOfBirth: zfd.text(z.string().regex(/^[0-9]{4}(-[0-9]{2}){2}$/)),
  address: zfd.text(),
  phone: zfd.numeric(),
  password: zfd.text(),
});

export async function POST(request: Request) {
  try {
    const {
      firstName,
      middleName,
      lastName,
      gender,
      dateOfBirth,
      address,
      phone,
      password,
    } = schema.parse(await request.formData());

    let encryptPassword = {};
    if (password)
      encryptPassword = { passwordHash: await bcrypt.hash(password, 10) };
    const cookieStore = cookies();
    const jwtToken = cookieStore.get("session_id");
    const decoded = verify(
      jwtToken!.value,
      process.env.JWT_SECRET!
    ) as UserTokenPayload;

    await prisma.user.update({
      where: { id: decoded.user_id },
      data: {
        ...encryptPassword,
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

    return Response.json(
      { message: "Successfully updated user" },
      {
        status: 302,
        headers: {
          Location: request.url,
        },
      }
    );
  } catch (e) {
    return Response.json(
      { message: "Failed" },
      {
        status: 302,
        headers: {
          Location: "/patient",
        },
      }
    );
  }
}
