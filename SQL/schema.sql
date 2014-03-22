CREATE DATABASE messagedb;

USE messagedb;



-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- -- Table 'users'
-- --
-- -- ---

-- DROP TABLE IF EXISTS `users`;

-- CREATE TABLE `users` (
--   `id` INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
--   `name` VARCHAR(50) DEFAULT NULL,
--   `currentRoom` INTEGER(2) DEFAULT NULL
-- );

-- -- ---
-- -- Table 'friends'
-- --
-- -- ---

-- DROP TABLE IF EXISTS `friends`;

-- CREATE TABLE `friends` (
--   `id` INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
--   `friender` INTEGER(5) DEFAULT NULL,
--   `friendee` INTEGER(5) DEFAULT NULL
-- );

-- ---
-- Table 'messages'
--
-- ---

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `username` TEXT(255) DEFAULT NULL,
  `message` TEXT(255) DEFAULT NULL
);

-- -- ---
-- -- Table 'rooms'
-- --
-- -- ---

-- DROP TABLE IF EXISTS `rooms`;

-- CREATE TABLE `rooms` (
--   `id` INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
--   `name` VARCHAR(50) DEFAULT NULL
-- );

-- -- ---
-- -- Foreign Keys
-- -- ---

-- ALTER TABLE `users` ADD FOREIGN KEY (currentRoom) REFERENCES `rooms` (`id`);
-- ALTER TABLE `friends` ADD FOREIGN KEY (friender) REFERENCES `users` (`id`);
-- ALTER TABLE `friends` ADD FOREIGN KEY (friendee) REFERENCES `users` (`id`);
-- ALTER TABLE `messages` ADD FOREIGN KEY (user) REFERENCES `users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `friends` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id`,`name`,`currentRoom`) VALUES
-- ('','','');
-- INSERT INTO `friends` (`id`,`friender`,`friendee`) VALUES
-- ('','','');
-- INSERT INTO `messages` (`id`,`text`,`user`,`time`) VALUES
-- ('','','','');
-- INSERT INTO `rooms` (`id`,`name`) VALUES
-- ('','');


/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
