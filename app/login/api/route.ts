import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const formData = await request.formData();
  await prisma.patient.create({
    data: {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    },
  });
  return Response.json({ message: "Success" });
}
