CREATE TABLE `track` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(128),
  `youtube_url` VARCHAR(255),
  `id_album` INT NOT NULL,
);

CREATE TABLE `album` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(255),
  `genre` VARCHAR(255),
  `picture` VARCHAR(255),
  `artist` VARCHAR(255),
);

ALTER TABLE `track` ADD FOREIGN KEY (`id_album`) REFERENCES `album`(`id`) ON DELETE SET NULL;