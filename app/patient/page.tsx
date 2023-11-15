import { UserTokenPayload } from "@/src/types";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { getUserInfoFromCookie } from "@/src/helpers";

export default async function PatientPortal() {
  const userPayload = getUserInfoFromCookie();
  const appointments = await getUserAppointments(userPayload);
  const user = (await getUserInfo(userPayload))!;

  return (
    <div>
      <h1>Patient Portal</h1>
      <h2>Your Appointments</h2>

      {user.role == "ADMIN" && (
        <Link href="/doctor/register">Register New Doctor</Link>
      )}

      <table>
        <thead>
          <tr>
            <th>Date Scheduled</th>
            <th>Status</th>
            <th>Room No.</th>
            <th>Reason</th>
            <th>
              <Link className="bg-blue-300" href="/patient/appointments/new">
                Create New
              </Link>
            </th>
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

function getUserAppointments(user: UserTokenPayload) {
  const prisma = new PrismaClient();
  return prisma.appointment.findMany({ where: { patientId: user.user_id } });
}

function getUserInfo(user: UserTokenPayload) {
  const prisma = new PrismaClient();
  return prisma.user.findUnique({ where: { id: user.user_id } });
}
