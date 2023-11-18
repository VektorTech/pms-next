import { getUserInfoFromCookie } from "@/src/helpers";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function AccountDetails({
  params,
}: {
  params: { id: string };
}) {
  const userPayload = getUserInfoFromCookie();
  const viewer = await getUserInfo(userPayload.user_id);
  const user = await getUserInfo(Number.parseInt(params.id));
  if (userPayload.type != "doctor-user" && viewer.role != "ADMIN")
    redirect("/");

  return (
    <main className="container pt-8 pb-14">
      <form className="flex flex-col space-y-4 max-w-md mx-auto">
        <h1 className="heading-1 mt-10">View Account Details</h1>
        <fieldset className="flex flex-col gap-y-2">
          <input
            className="text-box"
            required
            type="text"
            placeholder="First Name"
            defaultValue={user.firstName}
            readOnly
          />
          <input
            className="text-box"
            type="text"
            placeholder="Middle Name"
            defaultValue={user.middleName ?? ""}
            readOnly
          />
          <input
            className="text-box"
            type="text"
            required
            placeholder="Last Name"
            defaultValue={user.lastName}
            readOnly
          />
        </fieldset>
        <label className="label">
          Gender
          <input
            className="text-box capitalize"
            type="text"
            required
            placeholder="Gender"
            defaultValue={user.gender.toLowerCase()}
            readOnly
          />
        </label>
        <label className="label">
          Birth Day
          <input
            defaultValue={user.dob.toISOString().split("T")[0]}
            type="date"
            required
            className="text-box"
            readOnly
          />
        </label>
        <label className="label">
          Address
          <textarea
            className="text-box p-3 h-20"
            defaultValue={user.address}
            required
            readOnly
          ></textarea>
        </label>
        <input
          type="text"
          pattern="[0-9]+"
          placeholder="Phone"
          defaultValue={user.phone.toString()}
          required
          className="text-box"
          readOnly
        />
        <hr />
        <input
          defaultValue={user.email}
          type="email"
          placeholder="Email"
          required
          readOnly
          className="text-box"
        />
      </form>
    </main>
  );
}

async function getUserInfo(id: number) {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) redirect("/");
  return user;
}
