/*
  Warnings:

  - Added the required column `dsID` to the `doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctors` ADD COLUMN `dsID` VARCHAR(191) NOT NULL;
