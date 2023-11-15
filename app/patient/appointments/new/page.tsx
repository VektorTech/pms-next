export default function NewAppointment() {
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
            <option value="05">Dr. Isaac</option>
          </datalist>
        </label>
        <input type="submit" value="Book Appointment" />
      </form>
    </main>
  );
}
