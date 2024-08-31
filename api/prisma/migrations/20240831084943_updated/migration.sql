/*
  Warnings:

  - You are about to drop the column `crearedAt` on the `Like` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Like" DROP COLUMN "crearedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
