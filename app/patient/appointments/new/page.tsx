import { PrismaClient } from "@prisma/client";

export default async function NewAppointment() {
  const prisma = new PrismaClient();
  const allDoctors = await prisma.doctor.findMany({ include: { user: true } });

  return (
    <main className="container">
      <form
        className="flex flex-col space-y-4 max-w-md mx-auto"
        method="POST"
        action="/patient/appointments/new/api"
      >
        <h1 className="heading-1 mt-10">Create New Appointment</h1>
        <label className="label">
          Reason
          <textarea
            className="text-box p-3 h-20"
            required
            name="reason"
          ></textarea>
        </label>
        <fieldset className="flex flex-wrap">
          <legend className="w-full">Date & Time</legend>
          <label className="label basis-1/2">
            <input
              className="text-box w-[98%]"
              required
              type="date"
              name="date"
            />
          </label>
          <label className="label basis-1/2">
            <input
              className="text-box w-[98%] ml-auto"
              required
              type="time"
              name="time"
            />
          </label>
        </fieldset>
        <label className="label">
          <select
            className="text-box"
            required
            name="doctor"
            placeholder="Doctor"
          >
            {allDoctors.map((doctor) => (
              <option key={doctor.userId} value={doctor.userId}>
                Dr. {doctor.user.middleName?.substring(0, 1)}{" "}
                {doctor.user.lastName} - {doctor.specialty}
              </option>
            ))}
          </select>
        </label>
        <input className="button" type="submit" value="Book Appointment" />
      </form>
    </main>
  );
}
