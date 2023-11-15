import { PrismaClient } from "@prisma/client";
import { zfd } from "zod-form-data";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { UserTokenPayload } from "@/src/types";

const prisma = new PrismaClient();

const schema = zfd.formData({
  reason: zfd.text(),
  date: zfd.text(),
  time: zfd.text(),
  doctor: zfd.numeric(),
});

export async function POST(request: Request) {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("session_id");
  const { reason, date, time, doctor } = schema.parse(await request.formData());

  try {
    const decoded = jwt.verify(
      jwtToken!.value,
      process.env.JWT_SECRET!
    ) as UserTokenPayload;
    const requestedDoctor = await prisma.doctor.findUnique({
      where: { userId: doctor },
    });
    if (!requestedDoctor)
      return Response.json({ message: "Doctor not registered" });
    await prisma.appointment.create({
      data: {
        status: "PENDING",
        reason,
        doctorId: doctor,
        patientId: decoded.user_id,
        scheduled: new Date(date + " " + time),
        roomNo: requestedDoctor.roomNo,
      },
    });

    return Response.json(
      { message: "Success" },
      {
        status: 302,
        headers: {
          Location: "/patient",
        },
      }
    );
  } catch (e) {
    return Response.json(
      { message: "Failed" },
      {
        status: 302,
        headers: {
          Location: "/login",
        },
      }
    );
  }
}
