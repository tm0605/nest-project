/*
  Warnings:

  - You are about to drop the column `addressId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_addressId_fkey`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `addressId`,
    ADD COLUMN `address` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Address`;
