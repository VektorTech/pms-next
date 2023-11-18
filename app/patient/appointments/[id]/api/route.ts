import { sendMail } from "@/src/sendMail";
import { UserTokenPayload } from "@/src/types";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { prisma } from "@/src/prismaInstance";

const schema = zfd.formData({
  reason: zfd.text(),
  date: zfd.text(z.string().regex(/^[0-9]{4}(-[0-9]{2}){2}T/)),
  appointmentId: zfd.numeric(),
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const { date, reason, appointmentId } = schema.parse(formData);
    const update = formData.get("update"),
      cancel = formData.get("cancel"),
      approve = formData.get("approve"),
      decline = formData.get("decline"),
      complete = formData.get("complete"),
      missed = formData.get("missed");

    const cookieStore = cookies();
    const jwtToken = cookieStore.get("session_id");

    const decoded = verify(
      jwtToken!.value,
      process.env.JWT_SECRET!
    ) as UserTokenPayload;

    if (decoded.type == "patient-user") {
      if (update) {
        await prisma.appointment.update({
          where: { id: appointmentId, patientId: decoded.user_id },
          data: {
            scheduled: new Date(date),
            reason,
          },
        });
      } else if (cancel) {
        await prisma.appointment.update({
          where: { id: appointmentId, patientId: decoded.user_id },
          data: {
            status: "CANCELLED",
          },
        });
      }
    }

    if (decoded.type == "doctor-user") {
      const _status =
        (!!approve && "APPROVED") ||
        (!!decline && "DECLINED") ||
        (!!complete && "COMPLETED") ||
        (!!missed && "MISSED") ||
        "PENDING";
      const _appointment = await prisma.appointment.update({
        where: { id: appointmentId, doctorId: decoded.user_id },
        data: {
          status: _status,
        },
        include: {
          patient: {
            select: { user: { select: { email: true, firstName: true } } },
          },
          doctor: {
            select: { user: { select: { lastName: true } } },
          },
        },
      });
      await sendMail(
        _appointment.patient.user.email,
        `Update regarding your appointment: #${appointmentId}`,
        `<p>Dear ${
          _appointment.patient.user.firstName
        },</p><p>Your appointment scheduled for ${_appointment.scheduled.toString()} with Dr. ${
          _appointment.doctor.user.lastName
        } has been marked: ${_status}.</p>`
      );
    }

    return Response.redirect(request.url.replace("/api", ""));
  } catch (e) {
    return Response.redirect(request.url.replace("/api", ""));
  } finally {
    if (process.env.VERCEL) prisma.$disconnect();
  }
}
