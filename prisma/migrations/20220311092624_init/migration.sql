-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('CLERK', 'MANAGER', 'GUESTS');

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reservationStart" TIMESTAMP(3) NOT NULL,
    "reservationEnd" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "guestId" INTEGER NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "ROLE",

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "roomNumber" INTEGER NOT NULL,
    "hasOceanView" BOOLEAN NOT NULL,
    "pricePerNight" DOUBLE PRECISION NOT NULL,
    "hasBathroom" BOOLEAN NOT NULL,
    "numberOfAdultBeds" INTEGER NOT NULL,
    "maxOccupancy" INTEGER NOT NULL,
    "hasAircondition" BOOLEAN NOT NULL,
    "hasMinibar" BOOLEAN NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
