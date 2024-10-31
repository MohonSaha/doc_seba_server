-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('SUPER_ADMIN', 'ADMIN', 'DiagnosticCenter', 'DOCTOR', 'PATIENT') NOT NULL,
    `needPasswordChange` BOOLEAN NOT NULL DEFAULT true,
    `status` ENUM('PENDING', 'REVIEWING', 'ACTIVATE', 'BLOCKED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diagnosticCenters` (
    `diagnosticID` VARCHAR(191) NOT NULL,
    `dsID` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `contactInfo` VARCHAR(191) NULL,
    `altContactInfo` VARCHAR(191) NULL,
    `openingHours` VARCHAR(191) NULL,
    `websiteUrl` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `rating` INTEGER NULL,
    `logo` VARCHAR(191) NULL,
    `bannerImg` VARCHAR(191) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `addressId` VARCHAR(191) NULL,

    UNIQUE INDEX `diagnosticCenters_email_key`(`email`),
    PRIMARY KEY (`diagnosticID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `addresses` (
    `id` VARCHAR(191) NOT NULL,
    `division` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `upozila` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admins` (
    `id` VARCHAR(191) NOT NULL,
    `dsID` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `profilePhoto` VARCHAR(191) NULL,
    `contactNumber` VARCHAR(191) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admins_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctors` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `profilePhoto` VARCHAR(191) NULL,
    `contactNumber` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `registrationNo` VARCHAR(191) NULL,
    `experience` INTEGER NOT NULL DEFAULT 0,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `appointmentFee` INTEGER NULL,
    `qualification` VARCHAR(191) NULL,
    `currentWorkignPlace` VARCHAR(191) NULL,
    `designation` VARCHAR(191) NULL,
    `averageRating` DOUBLE NOT NULL DEFAULT 0.0,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `doctors_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `diagnosticCenters` ADD CONSTRAINT `diagnosticCenters_email_fkey` FOREIGN KEY (`email`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diagnosticCenters` ADD CONSTRAINT `diagnosticCenters_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `addresses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_email_fkey` FOREIGN KEY (`email`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctors` ADD CONSTRAINT `doctors_email_fkey` FOREIGN KEY (`email`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
