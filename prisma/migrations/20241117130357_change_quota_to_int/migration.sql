/*
  Warnings:

  - You are about to alter the column `usedQuota` on the `UserQuota` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "UserQuota" ALTER COLUMN "usedQuota" SET DEFAULT 0,
ALTER COLUMN "usedQuota" SET DATA TYPE INTEGER;
