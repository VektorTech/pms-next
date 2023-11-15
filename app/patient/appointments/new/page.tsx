import { PrismaClient } from "@prisma/client";

export default async function NewAppointment() {
  const prisma = new PrismaClient();
  const allDoctors = await prisma.doctor.findMany({ include: { user: true } });

  return (
    <main>
      <form method="POST" action="/patient/appointments/new/api">
        <h1>Create New Appointment</h1>
        <label>
          Reason
          <textarea></textarea>
        </label>
        <fieldset>
          <legend>Date & Time</legend>
          <label>
            <input type="date" name="date" placeholder="" />
          </label>
          <label>
            <input type="time" name="time" placeholder="" />
          </label>
        </fieldset>
        <label>
          <input list="doctors" name="doctor" placeholder="Doctor" />
          <datalist id="doctors">
            {allDoctors.map((doctor) => (
              <option key={doctor.userId} value={doctor.userId}>
                Dr. {doctor.user.middleName?.substring(0, 1)}{" "}
                {doctor.user.lastName} - {doctor.specialty}
              </option>
            ))}
          </datalist>
        </label>
        <input type="submit" value="Book Appointment" />
      </form>
    </main>
  );
}
