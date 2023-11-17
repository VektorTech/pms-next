import { getUserInfoFromCookie } from "@/src/helpers";
import { UserTokenPayload } from "@/src/types";
import { PrismaClient } from "@prisma/client";

export default async function AccountDetails() {
  const userPayload = getUserInfoFromCookie();
  const user = (await getUserInfo(userPayload))!;

  return (
    <main className="container">
      <form
        className="flex flex-col space-y-4 max-w-md mx-auto"
        method="POST"
        action="/patient/account/api"
      >
        <h1 className="heading-1 mt-10">Edit Account Details</h1>
        <fieldset className="flex flex-col gap-y-2">
          <input
            className="text-box"
            required
            type="text"
            name="firstName"
            placeholder="First Name"
            defaultValue={user.firstName}
          />
          <input
            className="text-box"
            type="text"
            name="middleName"
            placeholder="Middle Name"
            defaultValue={user.middleName ?? ""}
          />
          <input
            className="text-box"
            type="text"
            name="lastName"
            required
            placeholder="Last Name"
            defaultValue={user.lastName}
          />
        </fieldset>
        <label className="label">
          Gender
          <select
            className="text-box"
            name="gender"
            required
            defaultValue={user.gender}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </label>
        <label className="label">
          Birth Day
          <input
            defaultValue={user.dob.toISOString().split("T")[0]}
            type="date"
            name="dateOfBirth"
            required
            className="text-box"
          />
        </label>
        <label className="label">
          Address
          <textarea
            className="text-box p-3 h-20"
            defaultValue={user.address}
            name="address"
            required
          ></textarea>
        </label>
        <input
          type="text"
          name="phone"
          pattern="[0-9]+"
          placeholder="Phone"
          defaultValue={user.phone.toString()}
          required
          className="text-box"
        />
        <hr />
        <input
          defaultValue={user.email}
          type="email"
          name="email"
          placeholder="Email"
          required
          readOnly
          className="text-box"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="text-box"
        />
        <input className="button" type="submit" defaultValue="Update" />
      </form>
    </main>
  );
}

function getUserInfo(user: UserTokenPayload) {
  const prisma = new PrismaClient();
  return prisma.user.findUnique({ where: { id: user.user_id } });
}
