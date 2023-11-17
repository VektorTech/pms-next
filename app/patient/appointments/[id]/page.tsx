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
    <main className="container">
      <form
        className="flex flex-col space-y-4 max-w-md mx-auto"
        method="POST"
        action={`/patient/appointments/${params.id}/api`}
      >
        <h1 className="heading-1 mt-10">View/Edit Appointment</h1>

        <label className="label">
          Patient
          <input
            className="text-box"
            readOnly
            defaultValue={`${appointment.patient.user.firstName} ${appointment.patient.user.lastName}`}
          />
        </label>
        <label className="label">
          Doctor
          <input
            className="text-box"
            readOnly
            defaultValue={`${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`}
          />
        </label>
        <label className="label">
          Status
          <input
            className="text-box"
            readOnly
            defaultValue={appointment.status}
          />
        </label>
        <label className="label">
          Reason
          <textarea
            className="text-box p-3 h-20"
            name="reason"
            defaultValue={appointment.reason}
          ></textarea>
        </label>
        <label className="label">
          Date & Time
          <input
            type="datetime-local"
            name="date"
            className="text-box"
            defaultValue={appointment.scheduled.toISOString().split(".")[0]}
          />
        </label>

        <label className="label">
          Room Number:
          <input
            className="text-box w-12 text-center"
            readOnly
            defaultValue={appointment.roomNo}
          />
        </label>

        <input type="hidden" name="appointmentId" value={params.id} />

        <div className="flex flex-wrap gap-1">
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
                className="button bg-red-400"
              />
              <input
                disabled={appointment.status !== "PENDING"}
                type="submit"
                name="update"
                value="Update"
                className="button"
              />
            </>
          )}

          {userPayload.type == "doctor-user" && (
            <>
              <input
                disabled={
                  !(
                    appointment.status == "PENDING" ||
                    appointment.status == "DECLINED"
                  )
                }
                type="submit"
                name="approve"
                value="Approve Appointment"
                className="button bg-green-600"
              />
              <input
                disabled={
                  !(
                    appointment.status == "PENDING" ||
                    appointment.status == "APPROVED"
                  )
                }
                type="submit"
                name="decline"
                value="Decline Appointment"
                className="button bg-red-400"
              />
              <input
                disabled={
                  appointment.status !== "APPROVED" ||
                  appointment.scheduled.valueOf() > Date.now()
                }
                type="submit"
                name="complete"
                value="Mark As Complete"
                className="button"
              />
              <input
                disabled={
                  appointment.status !== "APPROVED" ||
                  appointment.scheduled.valueOf() > Date.now()
                }
                type="submit"
                name="missed"
                value="Mark As Missed"
                className="button bg-orange-400"
              />
            </>
          )}
        </div>
      </form>
    </main>
  );
}
