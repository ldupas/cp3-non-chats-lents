CREATE DATABASE `cp3`;
USE `cp3`;

CREATE TABLE `track` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(128),
    `youtube_url` VARCHAR(255),
    `id_album` INT
);

CREATE TABLE `album`(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255),
    `genre` VARCHAR(255),
    `picture` VARCHAR(255),
    `artitst` VARCHAR(255)
);

ALTER TABLE `track` ADD FOREIGN KEY (`id_album`) REFERENCES `album`(`id`) ON DELETE SET NULL;

INSERT INTO `album` (`title`, `genre`, `picture`, `artitst`) VALUES
("The Dark Side of the Moon", "Rock", "https://images-na.ssl-images-amazon.com/images/I/41QfcId32%2BL._SY355_.jpg", "Pink Floyd");

INSERT INTO `track` (`title`, `youtube_url`, `id_album`) VALUES
("Money", "https://www.youtube.com/watch?v=-0kcet4aPpQ", 1);