-- CREATE DATABASE song;
-- USE song;

CREATE TABLE `album` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title`VARCHAR(255) NOT NULL,
    `genre` VARCHAR(255) NOT NULL,
    `picture` VARCHAR(255) NOT NULL,
    `artist` VARCHAR(255) NOT NULL,
    PRIMARY KEY (
        `id`
    )
);

CREATE TABLE `track` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(128) NOT NULL,
    `youtube_url` VARCHAR(255) NOT NULL,
    `id_album` INT NOT NULL,
    PRIMARY KEY (
        `id`
    ),
    FOREIGN KEY (`id_album`) REFERENCES `album`(`id`)
);

INSERT INTO `album` (title, genre,picture, artist)
VALUE(
"8Mile",
"Rap",
"",
"Eminem"
);
INSERT INTO `track` (title,youtube_url, id_album)
VALUE(
"Lose Yourself",
"",
1
);

INSERT INTO `album` (title, genre,picture, artist)
VALUE(
"Meteora",
"Rock",
"",
"Linkin Park"
);
INSERT INTO `track` (title,youtube_url, id_album)
VALUE(
"Numb",
"",
2
);