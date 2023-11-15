import { confirmAdminUser } from "@/src/helpers";

export default async function RegisterDoctor() {
  await confirmAdminUser();

  return (
    <main className="">
      <form
        method="POST"
        action="/doctor/register/api"
        className="flex flex-col"
      >
        <h1>Register Doctor Account</h1>

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
            <input type="text" name="middleName" placeholder="Middle Name" />
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
          <input
            type="text"
            name="specialty"
            required
            placeholder="Specialty"
          />
        </label>

        <label>
          <input
            required
            type="number"
            name="roomNo"
            placeholder="Room/Office Number"
          />
        </label>

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
