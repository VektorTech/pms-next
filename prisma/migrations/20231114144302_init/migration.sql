-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CANCELLED', 'DECLINED', 'APPROVED', 'COMPLETED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "phone" BIGINT NOT NULL,
    "emergencyContact" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "userId" INTEGER NOT NULL,
    "insuranceDetails" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Doctor" (
    "userId" INTEGER NOT NULL,
    "specialty" TEXT NOT NULL DEFAULT 'Physician'
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "scheduled" TIMESTAMP(3) NOT NULL,
    "roomNo" INTEGER NOT NULL,
    "status" "AppointmentStatus" NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalDetails" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "bloodType" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "diagnosis" TEXT[],
    "pescriptions" TEXT[],
    "allergies" TEXT[],

    CONSTRAINT "MedicalDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_userId_key" ON "Patient"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_userId_key" ON "Doctor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalDetails_patientId_key" ON "MedicalDetails"("patientId");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalDetails" ADD CONSTRAINT "MedicalDetails_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
