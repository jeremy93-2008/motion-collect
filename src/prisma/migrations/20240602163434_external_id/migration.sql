/*
  Warnings:

  - Added the required column `externalId` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalId` to the `TVSeries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movies" ADD COLUMN     "externalId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TVSeries" ADD COLUMN     "externalId" TEXT NOT NULL;
