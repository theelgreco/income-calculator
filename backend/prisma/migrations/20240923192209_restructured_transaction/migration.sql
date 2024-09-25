/*
  Warnings:

  - You are about to drop the column `amount_in_pence` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `first_last_day_of_month` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `recurrence_rate` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `recurrence_rate_type` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `recurrence_type` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `specific_day_of_month` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `specific_day_of_week` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `amountInPence` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "amount_in_pence",
DROP COLUMN "first_last_day_of_month",
DROP COLUMN "recurrence_rate",
DROP COLUMN "recurrence_rate_type",
DROP COLUMN "recurrence_type",
DROP COLUMN "specific_day_of_month",
DROP COLUMN "specific_day_of_week",
ADD COLUMN     "amountInPence" INTEGER NOT NULL,
ADD COLUMN     "firstLastDayOfMonth" TEXT,
ADD COLUMN     "isRecurring" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "recurrenceRate" INTEGER,
ADD COLUMN     "recurrenceRateType" TEXT,
ADD COLUMN     "recurrenceType" TEXT,
ADD COLUMN     "specificDayOfMonth" INTEGER,
ADD COLUMN     "specificDayOfWeek" INTEGER;
