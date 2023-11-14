export default function Login() {
  return (
    <main className="">
      <form method="POST" action="/patient/register/api" className="flex flex-col">
        <h1>Register As Patient</h1>

        <fieldset>
          <label>
            <input type="text" name="firstName" placeholder="First Name" />
          </label>

          <label>
            <input type="text" name="lastName" placeholder="Last Name" />
          </label>
        </fieldset>

        <label>
          Gender
          <select name="gender" required>
            <option>Select...</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </label>

        <label>
          Birth Day
          <input type="date" name="dateOfBirth" />
        </label>

        <label>
          Address
          <textarea name="address"></textarea>
        </label>

        <label>
          <input
            type="text"
            name="phone"
            pattern="[0-9]+"
            placeholder="Phone"
          />
        </label>

        <hr />

        <label>
          <input type="email" name="email" placeholder="Email" />
        </label>

        <label>
          <input type="password" name="password" placeholder="Password" />
        </label>

        <input type="submit" value="Login" />
      </form>
    </main>
  );
}
