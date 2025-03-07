-- CreateTable
CREATE TABLE `user_tb` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `userFullname` VARCHAR(100) NOT NULL,
    `userEmail` VARCHAR(100) NOT NULL,
    `userName` VARCHAR(50) NOT NULL,
    `userPasswored` VARCHAR(50) NOT NULL,
    `userImage` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
