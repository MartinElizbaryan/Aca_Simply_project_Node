/*
  Warnings:

  - You are about to drop the column `adress` on the `item` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `item` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `surname` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE `item` DROP COLUMN `adress`,
    ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `confirmer_id` INTEGER NULL,
    ADD COLUMN `trusted` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `name` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `phone` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(50) NOT NULL,
    MODIFY `surname` VARCHAR(50) NOT NULL,
    MODIFY `money` INTEGER NOT NULL DEFAULT 2000;

-- CreateTable
CREATE TABLE `Faq` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(191) NOT NULL,
    `answer` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_confirmer_id_fkey` FOREIGN KEY (`confirmer_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
