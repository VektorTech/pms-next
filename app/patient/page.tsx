import { UserTokenPayload } from "@/src/types";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { getUserInfoFromCookie } from "@/src/helpers";

export default async function PatientPortal() {
  const userPayload = getUserInfoFromCookie();
  const appointments = await getUserAppointments(userPayload);
  const user = (await getUserInfo(userPayload))!;

  return (
    <main className="container">
      {user.role == "ADMIN" && (
        <div className="text-right">
          <Link className="button mt-3 inline-block" href="/doctor/register">
            Register New Doctor
          </Link>
        </div>
      )}
      <h1 className="mt-7 font-semibold">Patient Portal</h1>
      <div className="mt-5 border border-slate-200 rounded-lg px-5 py-8 overflow-x-auto">
        <h2 className="text-zinc-400 text-center font-semibold text-xl">
          Your Appointments
        </h2>

        <Link
          className="button mt-3 inline-block"
          href="/patient/appointments/new"
        >
          Create New
        </Link>

        <table className="w-full mt-5 min-w-[320px]">
          <thead className="text-left whitespace-nowrap">
            <tr className="tr border-b border-b-zinc-200">
              <th>Scheduled for</th>
              <th>Status</th>
              <th>Doctor</th>
              <th>Room No.</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody className="text-zinc-500">
            {appointments.map((appointment) => (
              <tr
                className="tr border-b border-b-zinc-200 text-sm"
                key={appointment.id}
              >
                <td>{appointment.scheduled.toString()}</td>
                <td>{appointment.status}</td>
                <td>Dr. {appointment.doctor.user.lastName}</td>
                <td>{appointment.roomNo}</td>
                <td>{appointment.reason}</td>
                <td>
                  <Link
                    className="button-outline"
                    href={`/patient/appointments/${appointment.id}`}
                  >
                    View / Edit
                  </Link>
                </td>
              </tr>
            ))}
            {!appointments.length && (
              <tr className="text-center tr">
                <td colSpan={5}>No Appointment Records</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function getUserAppointments(user: UserTokenPayload) {
  const prisma = new PrismaClient();
  return prisma.appointment.findMany({
    where: { patientId: user.user_id },
    include: { doctor: { include: { user: true } } },
  });
}

function getUserInfo(user: UserTokenPayload) {
  const prisma = new PrismaClient();
  return prisma.user.findUnique({ where: { id: user.user_id } });
}
