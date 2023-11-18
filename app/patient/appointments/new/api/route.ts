import { zfd } from "zod-form-data";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { UserTokenPayload } from "@/src/types";
import { sendMail } from "@/src/sendMail";
import { prisma } from "@/src/prismaInstance";

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
      include: { user: { select: { email: true, lastName: true } } },
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

    await sendMail(
      requestedDoctor.user.email,
      "New Appointment Request.",
      `<p>Dear Dr. ${requestedDoctor.user.lastName},</p><p>You have a request for an appointment on ${date} at ${time} regarding:<br><i>${reason}</i></p><p>Regards.</p>`
    ).catch(console.log);

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
  } finally {
    if (process.env.VERCEL) prisma.$disconnect();
  }
}
