import { confirmAdminUser } from "@/src/helpers";

export default async function RegisterDoctor() {
  await confirmAdminUser();

  return (
    <main className="container">
      <form
        className="flex flex-col space-y-4 max-w-md mx-auto py-10"
        method="POST"
        action="/doctor/register/api"
      >
        <h1 className="heading-1 mt-10">Register Doctor&apos;s Account</h1>
        <fieldset className="flex flex-col gap-y-2">
          <input
            className="text-box"
            type="text"
            name="firstName"
            required
            placeholder="First Name"
          />
          <input
            className="text-box"
            type="text"
            name="middleName"
            placeholder="Middle Name"
          />
          <input
            className="text-box"
            type="text"
            name="lastName"
            required
            placeholder="Last Name"
          />
        </fieldset>
        <input
          type="text"
          name="specialty"
          required
          placeholder="Specialty"
          className="text-box"
        />
        <input
          required
          type="number"
          name="roomNo"
          min={1}
          placeholder="Room / Office Number"
          className="text-box"
        />
        <label className="label">
          Gender
          <select className="text-box" name="gender" required>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </label>
        <label className="label">
          Birth Day
          <input className="text-box" type="date" name="dateOfBirth" required />
        </label>
        <label className="label">
          Address
          <textarea
            className="text-box p-3 h-20"
            name="address"
            required
          ></textarea>
        </label>
        <input
          type="text"
          name="phone"
          pattern="[0-9]+"
          placeholder="Phone"
          required
          className="text-box"
        />
        <hr />
        <input
          className="text-box"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="text-box"
        />
        <input className="button" type="submit" value="Register" />
      </form>
    </main>
  );
}
