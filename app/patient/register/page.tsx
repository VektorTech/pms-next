export default function Login() {
  return (
    <main className="">
      <form
        method="POST"
        action="/patient/register/api"
        className="flex flex-col"
      >
        <h1>Register As Patient</h1>

        <fieldset>
          <label>
            <input
              type="text"
              name="firstName"
              required
              placeholder="First Name"
            />
          </label>

          <label>
            <input
              type="text"
              name="lastName"
              required
              placeholder="Last Name"
            />
          </label>
        </fieldset>

        <label>
          Gender
          <select name="gender" required>
            <option>Male</option>
            <option>Female</option>
          </select>
        </label>

        <label>
          Birth Day
          <input type="date" name="dateOfBirth" required />
        </label>

        <label>
          Address
          <textarea name="address" required></textarea>
        </label>

        <label>
          <input
            type="text"
            name="phone"
            pattern="[0-9]+"
            placeholder="Phone"
            required
          />
        </label>

        <hr />

        <label>
          <input type="email" name="email" placeholder="Email" required />
        </label>

        <label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </label>

        <input type="submit" value="Register" />
      </form>
    </main>
  );
}
