import { getUserInfoFromCookie } from "@/src/helpers";
import { UserTokenPayload } from "@/src/types";
import { PrismaClient } from "@prisma/client";

export default async function AccountDetails() {
  const userPayload = getUserInfoFromCookie();
  const user = (await getUserInfo(userPayload))!;

  return (
    <main className="">
      <form
        method="POST"
        action="/patient/account/api"
        className="flex flex-col"
      >
        <h1></h1>

        <fieldset>
          <label>
            <input
              required
              type="text"
              name="firstName"
              placeholder="First Name"
              defaultValue={user.firstName}
            />
          </label>

          <label>
            <input
              type="text"
              name="middleName"
              placeholder="Middle Name"
              defaultValue={user.middleName ?? ""}
            />
          </label>

          <label>
            <input
              type="text"
              name="lastName"
              required
              placeholder="Last Name"
              defaultValue={user.lastName}
            />
          </label>
        </fieldset>

        <label>
          Gender
          <select name="gender" required defaultValue={user.gender}>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </label>

        <label>
          Birth Day
          <input
            defaultValue={user.dob.toISOString().split("T")[0]}
            type="date"
            name="dateOfBirth"
            required
          />
        </label>

        <label>
          Address
          <textarea
            defaultValue={user.address}
            name="address"
            required
          ></textarea>
        </label>

        <label>
          <input
            type="text"
            name="phone"
            pattern="[0-9]+"
            placeholder="Phone"
            defaultValue={user.phone.toString()}
            required
          />
        </label>

        <hr />

        <label>
          <input
            defaultValue={user.email}
            type="email"
            name="email"
            placeholder="Email"
            required
            readOnly
          />
        </label>

        <label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </label>

        <input type="submit" defaultValue="Register" />
      </form>
    </main>
  );
}

function getUserInfo(user: UserTokenPayload) {
  const prisma = new PrismaClient();
  return prisma.user.findUnique({ where: { id: user.user_id } });
}
