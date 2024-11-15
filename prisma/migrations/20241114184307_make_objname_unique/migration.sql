/*
  Warnings:

  - A unique constraint covering the columns `[objectName]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "UserQuota" (
    "userId" TEXT NOT NULL,
    "usedQuota" DECIMAL(65,30) NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "UserQuota_userId_key" ON "UserQuota"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "File_objectName_key" ON "File"("objectName");

-- AddForeignKey
ALTER TABLE "UserQuota" ADD CONSTRAINT "UserQuota_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
