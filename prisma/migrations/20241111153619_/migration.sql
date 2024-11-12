/*
  Warnings:

  - You are about to drop the column `name` on the `borrow_records` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "borrow_records" DROP COLUMN "name",
ALTER COLUMN "borrowDate" SET DEFAULT CURRENT_TIMESTAMP;
