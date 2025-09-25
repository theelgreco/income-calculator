/*
  Warnings:

  - Added the required column `authId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "authId" TEXT;

UPDATE "User" SET "authId" = "id" WHERE "authId" IS NULL;

ALTER TABLE "User" ALTER COLUMN "authId" SET NOT NULL;