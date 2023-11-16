import { getUserInfoFromCookie } from "@/src/helpers";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function AppointmentDetails({
  params,
}: {
  params: { id: string };
}) {
  const prisma = new PrismaClient();
  const appointment = await prisma.appointment.findUnique({
    where: { id: Number.parseInt(params.id) },
    include: {
      doctor: { select: { user: true } },
      patient: { select: { user: true } },
    },
  });
  const userPayload = await getUserInfoFromCookie();
  if (!appointment) redirect("/patient");

  return (
    <main>
      <form method="POST" action={`/patient/appointments/${params.id}/api`}>
        <h1>View/Edit Appointment</h1>
        <label>
          Patient
          <input
            readOnly
            defaultValue={`${appointment.patient.user.firstName} ${appointment.patient.user.lastName}`}
          />
        </label>
        <label>
          Doctor
          <input
            readOnly
            defaultValue={`${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`}
          />
        </label>
        <label>
          Status
          <input readOnly defaultValue={appointment.status} />
        </label>
        <label>
          Reason
          <textarea name="reason" defaultValue={appointment.reason}></textarea>
        </label>
        <fieldset>
          <legend>Date & Time</legend>
          <label>
            <input
              type="datetime-local"
              name="date"
              defaultValue={appointment.scheduled.toISOString().split(".")[0]}
            />
          </label>
        </fieldset>
        <label>
          Room Number:
          <input readOnly defaultValue={appointment.roomNo} />
        </label>

        <input type="hidden" name="appointmentId" value={params.id} />

        {userPayload.type == "patient-user" && (
          <>
            <input
              disabled={
                !(
                  appointment.status == "PENDING" ||
                  appointment.status == "APPROVED"
                )
              }
              type="submit"
              name="cancel"
              value="Cancel Appointment"
            />
            <input type="submit" name="update" value="Update" />
          </>
        )}

        {userPayload.type == "doctor-user" && (
          <>
            <input type="submit" name="approve" value="Approve Appointment" />
            <input type="submit" name="decline" value="Decline Appointment" />
            <input type="submit" name="complete" value="Mark As Complete" />
            <input type="submit" name="missed" value="Mark As Missed" />
          </>
        )}
      </form>
    </main>
  );
}
