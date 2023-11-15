import { getUserInfoFromCookie } from "@/src/helpers";
import { UserTokenPayload } from "@/src/types";
import { PrismaClient } from "@prisma/client";

export default async function AccountDetails() {
  const userPayload = getUserInfoFromCookie();
  const user = (await getUserInfo(userPayload))!;

  return (
    <main className="">
      <form method="POST" action="" className="flex flex-col">
        <h1></h1>

        <fieldset>
          <label>
            <input
              required
              type="text"
              name="firstName"
              placeholder="First Name"
              value={user.firstName}
            />
          </label>

          <label>
            <input
              type="text"
              name="middleName"
              placeholder="Middle Name"
              value={user.middleName ?? ""}
            />
          </label>

          <label>
            <input
              type="text"
              name="lastName"
              required
              placeholder="Last Name"
              value={user.lastName}
            />
          </label>
        </fieldset>

        <label>
          Gender
          <select name="gender" required>
            <option selected={user.gender == "MALE"}>Male</option>
            <option selected={user.gender == "FEMALE"}>Female</option>
          </select>
        </label>

        <label>
          Birth Day
          <input
            value={user.dob.toISOString().split("T")[0]}
            type="date"
            name="dateOfBirth"
            required
          />
        </label>

        <label>
          Address
          <textarea name="address" required>
            {user.address}
          </textarea>
        </label>

        <label>
          <input
            type="text"
            name="phone"
            pattern="[0-9]+"
            placeholder="Phone"
            value={user.phone.toString()}
            required
          />
        </label>

        <hr />

        <label>
          <input
            value={user.email}
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

        <input type="submit" value="Register" />
      </form>
    </main>
  );
}

function getUserInfo(user: UserTokenPayload) {
  const prisma = new PrismaClient();
  return prisma.user.findUnique({ where: { id: user.user_id } });
}
