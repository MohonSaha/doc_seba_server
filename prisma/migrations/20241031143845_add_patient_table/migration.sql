/*
  Warnings:

  - A unique constraint covering the columns `[dsID]` on the table `admins` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dsID]` on the table `diagnosticCenters` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dsID]` on the table `doctors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `patients` (
    `id` VARCHAR(191) NOT NULL,
    `dsID` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `profilePhoto` VARCHAR(191) NULL,
    `contactNumber` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `patients_id_key`(`id`),
    UNIQUE INDEX `patients_dsID_key`(`dsID`),
    UNIQUE INDEX `patients_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `admins_dsID_key` ON `admins`(`dsID`);

-- CreateIndex
CREATE UNIQUE INDEX `diagnosticCenters_dsID_key` ON `diagnosticCenters`(`dsID`);

-- CreateIndex
CREATE UNIQUE INDEX `doctors_dsID_key` ON `doctors`(`dsID`);

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_email_fkey` FOREIGN KEY (`email`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
