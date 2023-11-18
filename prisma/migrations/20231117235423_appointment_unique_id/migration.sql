/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Appointment_id_key" ON "Appointment"("id");
