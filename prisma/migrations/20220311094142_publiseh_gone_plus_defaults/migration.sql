/*
  Warnings:

  - You are about to drop the column `published` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "published";

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "hasOceanView" SET DEFAULT false,
ALTER COLUMN "hasBathroom" SET DEFAULT false,
ALTER COLUMN "numberOfAdultBeds" SET DEFAULT 2,
ALTER COLUMN "maxOccupancy" SET DEFAULT 2,
ALTER COLUMN "hasAircondition" SET DEFAULT true,
ALTER COLUMN "hasMinibar" SET DEFAULT true;
