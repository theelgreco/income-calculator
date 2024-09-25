/*
  Warnings:

  - You are about to drop the column `finishTime` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `frequency_interval_in_days` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "finishTime",
DROP COLUMN "frequency_interval_in_days",
DROP COLUMN "startTime",
ADD COLUMN     "finishDate" TIMESTAMP(3),
ADD COLUMN     "first_last_day_of_month" TEXT,
ADD COLUMN     "recurrence_rate" INTEGER,
ADD COLUMN     "recurrence_rate_type" TEXT,
ADD COLUMN     "recurrence_type" TEXT,
ADD COLUMN     "specific_day_of_month" INTEGER,
ADD COLUMN     "specific_day_of_week" INTEGER,
ADD COLUMN     "startDate" TIMESTAMP(3);
