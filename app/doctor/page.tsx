import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { UserTokenPayload } from "@/src/types";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

export default async function PatientPortal() {
  const user = getUserInfoFromCookie();
  const appointments = await getPatientAppointments(user);

  return (
    <div>
      <h1>Doctor Portal</h1>
      <h2>Patient Appointments</h2>

      <table>
        <thead>
          <tr>
            <th>Date Scheduled</th>
            <th>Status</th>
            <th>Patient Details</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.scheduled.toDateString()}</td>
              <td>{appointment.status}</td>
              <td>{appointment.roomNo}</td>
              <td>{appointment.reason}</td>
              <td>
                <Link href={`/patient/appointments/${appointment.id}`}>
                  View
                </Link>
              </td>
            </tr>
          ))}
          {!appointments.length && (
            <tr>
              <td colSpan={5}>No Appointment Records</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function getPatientAppointments(user: UserTokenPayload) {
  const prisma = new PrismaClient();
  return prisma.appointment.findMany({ where: { patientId: user.user_id } });
}

function getUserInfoFromCookie() {
  try {
    const cookieStore = cookies();
    const jwtToken = cookieStore.get("session_id");
    if (jwtToken && jwtToken.value && process.env.JWT_SECRET) {
      const decoded = jwt.verify(jwtToken.value, process.env.JWT_SECRET);
      return decoded as UserTokenPayload;
    }
    redirect("/login");
  } catch (e) {
    redirect("/login");
  }
}
