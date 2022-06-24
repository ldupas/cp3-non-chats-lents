CREATE TABLE `track`(
    `id` int NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(128),
    `youtube_url` VARCHAR (255),
    `id_album` INT NULL,
    PRIMARY KEY (
        `id`
    )
);

CREATE TABLE `album`(
    `id` int NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255),
    `genre` VARCHAR(255),
    `picture` VARCHAR(255),
    `artist` VARCHAR(255),
    PRIMARY KEY (
        `id`
    )
);

ALTER TABLE `track` ADD CONSTRAINT `fk_track_id_album` FOREIGN KEY(`id_album`)
REFERENCES `album` (`id`);