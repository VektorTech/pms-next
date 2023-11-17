import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { UserTokenPayload } from "@/src/types";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

export default async function PatientPortal() {
  const userPayload = getUserInfoFromCookie();
  const appointments = await getAppointments(userPayload);
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

      <h1 className="mt-7 font-semibold">Doctor Portal</h1>

      <div className="mt-5 border border-slate-200 rounded-lg px-5 py-8 overflow-x-auto">
        <h2 className="text-zinc-400 text-center font-semibold text-xl">
          Patient Appointments
        </h2>

        <table className="w-full mt-5 min-w-[320px]">
          <thead className="text-left whitespace-nowrap">
            <tr className="tr border-b border-b-zinc-200">
              <th>Date Scheduled</th>
              <th>Status</th>
              <th>Patient Details</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody className="text-zinc-500">
            {appointments.map((appointment) => (
              <tr
                className="tr border-b border-b-zinc-200 text-sm"
                key={appointment.id}
              >
                <td>{appointment.scheduled.toDateString()}</td>
                <td>{appointment.status}</td>
                <td>{appointment.roomNo}</td>
                <td>{appointment.reason}</td>
                <td>
                  <Link
                    className="button-outline"
                    href={`/patient/appointments/${appointment.id}`}
                  >
                    View
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

function getAppointments(user: UserTokenPayload) {
  const prisma = new PrismaClient();
  return prisma.appointment.findMany({ where: { doctorId: user.user_id } });
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

function getUserInfo(user: UserTokenPayload) {
  const prisma = new PrismaClient();
  return prisma.user.findUnique({ where: { id: user.user_id } });
}
