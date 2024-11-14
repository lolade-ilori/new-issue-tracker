-- DropForeignKey
ALTER TABLE `Issue` DROP FOREIGN KEY `Issue_assignedUserId_fkey`;

-- AlterTable
ALTER TABLE `Issue` MODIFY `assignedUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedUserId_fkey` FOREIGN KEY (`assignedUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
