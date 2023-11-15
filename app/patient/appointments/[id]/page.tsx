export default function AppointmentDetails() {
  return (
    <main>
      <form method="POST" action="/patient/appointments/new/api">
        <h1>Create New Appointment</h1>
        <label>
          Patient
          <input readOnly value={"Rand Name"} />
        </label>
        <label>
          Doctor
          <input readOnly value={"Dr. Rose"} />
        </label>
        <label>
          Status
          <input readOnly value={"Pending"} />
        </label>
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
          Room Number:
          <input readOnly value="2" />
        </label>
        <label>
          <input list="doctors" name="doctor" placeholder="Doctor" />
          <datalist id="doctors">
            <option value="05">Dr. Isaac</option>
          </datalist>
        </label>

        <input type="submit" name="cancel" value="Cancel Appointment" />

        <input type="submit" name="approve" value="Approve Appointment" />
        <input type="submit" name="decline" value="Decline Appointment" />
        <input type="submit" name="complete" value="Mark As Complete" />
        <input type="submit" name="missed" value="Mark As Missed" />

        <input type="submit" name="cancel" value="Update" />
      </form>
    </main>
  );
}
