-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "insuranceDetails" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "middleName" DROP NOT NULL,
ALTER COLUMN "emergencyContact" DROP NOT NULL;
