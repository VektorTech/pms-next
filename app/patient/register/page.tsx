import Link from "next/link";

export default function RegisterPatient() {
  return (
    <main className="w-96 mx-auto my-auto auth-bg">
      <form
        method="POST"
        action="/patient/register/api"
        className="flex flex-col space-y-3 px-8 py-12 bg-white rounded-md"
      >
        <h1 className="font-semibold text-2xl text-center mb-3">
          Register As Patient
        </h1>
        <fieldset className="flex gap-x-1">
          <input
            className="text-box w-[98%]"
            type="text"
            name="firstName"
            required
            placeholder="First Name"
          />
          <input
            className="text-box w-[98%] ml-auto"
            type="text"
            name="lastName"
            required
            placeholder="Last Name"
          />
        </fieldset>
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
          className="text-box"
          type="text"
          name="phone"
          pattern="[0-9]+"
          placeholder="Phone"
          required
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
          className="text-box"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input
          className="h-10 cursor-pointer bg-blue-500 text-sm text-white rounded-sm px-3"
          type="submit"
          value="Register"
        />
        <p className="text-center text-zinc-500 text-sm">
          <Link href="/login">or login here</Link>
        </p>
      </form>
    </main>
  );
}
