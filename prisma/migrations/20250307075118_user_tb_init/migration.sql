/*
  Warnings:

  - You are about to drop the column `userPasswored` on the `user_tb` table. All the data in the column will be lost.
  - Added the required column `userPassword` to the `user_tb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_tb` DROP COLUMN `userPasswored`,
    ADD COLUMN `userPassword` VARCHAR(50) NOT NULL;
