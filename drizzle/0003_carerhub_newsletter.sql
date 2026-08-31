-- CarerHub Newsletter Edition tables

CREATE TABLE `newsletter_editions` (
  `id` int AUTO_INCREMENT NOT NULL,
  `month` varchar(50) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `editorNote` text,
  `isPublished` boolean NOT NULL DEFAULT false,
  `publishedAt` timestamp,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `newsletter_editions_id` PRIMARY KEY(`id`),
  CONSTRAINT `newsletter_editions_slug_unique` UNIQUE(`slug`)
);

CREATE TABLE `centenarians` (
  `id` int AUTO_INCREMENT NOT NULL,
  `clientName` varchar(255) NOT NULL,
  `location` varchar(255),
  `joinedAt` timestamp NOT NULL DEFAULT (now()),
  `photoUrl` text,
  `note` text,
  `isActive` boolean NOT NULL DEFAULT true,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `centenarians_id` PRIMARY KEY(`id`)
);

CREATE TABLE `family_feedback` (
  `id` int AUTO_INCREMENT NOT NULL,
  `senderName` varchar(255) NOT NULL,
  `clientName` varchar(255),
  `message` text NOT NULL,
  `month` varchar(50),
  `isActive` boolean NOT NULL DEFAULT true,
  `sortOrder` int NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `family_feedback_id` PRIMARY KEY(`id`)
);

CREATE TABLE `team_members` (
  `id` int AUTO_INCREMENT NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(255),
  `bio` text,
  `photoUrl` text,
  `email` varchar(320),
  `location` varchar(255),
  `memberType` enum('caregiver','office') NOT NULL DEFAULT 'caregiver',
  `status` enum('active','left') NOT NULL DEFAULT 'active',
  `joinedMonth` varchar(50),
  `leftMonth` varchar(50),
  `isActive` boolean NOT NULL DEFAULT true,
  `sortOrder` int NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `team_members_id` PRIMARY KEY(`id`)
);

CREATE TABLE `crum_awards` (
  `id` int AUTO_INCREMENT NOT NULL,
  `caregiverName` varchar(255) NOT NULL,
  `month` varchar(50) NOT NULL,
  `isTopCrum` boolean NOT NULL DEFAULT false,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `crum_awards_id` PRIMARY KEY(`id`)
);

CREATE TABLE `attendance_club` (
  `id` int AUTO_INCREMENT NOT NULL,
  `caregiverName` varchar(255) NOT NULL,
  `month` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `attendance_club_id` PRIMARY KEY(`id`)
);

CREATE TABLE `workiversaries` (
  `id` int AUTO_INCREMENT NOT NULL,
  `caregiverName` varchar(255) NOT NULL,
  `years` int NOT NULL,
  `anniversaryDate` varchar(100),
  `month` varchar(50) NOT NULL,
  `note` text,
  `photoUrl` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `workiversaries_id` PRIMARY KEY(`id`)
);

CREATE TABLE `birthday_shoutouts` (
  `id` int AUTO_INCREMENT NOT NULL,
  `personName` varchar(255) NOT NULL,
  `personType` enum('client','caregiver') NOT NULL,
  `age` int,
  `birthdayDate` varchar(100),
  `month` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `birthday_shoutouts_id` PRIMARY KEY(`id`)
);

CREATE TABLE `magic_moments` (
  `id` int AUTO_INCREMENT NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `images` text,
  `month` varchar(50),
  `participants` varchar(500),
  `isActive` boolean NOT NULL DEFAULT true,
  `sortOrder` int NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `magic_moments_id` PRIMARY KEY(`id`)
);

CREATE TABLE `on_call_rota` (
  `id` int AUTO_INCREMENT NOT NULL,
  `dateRange` varchar(100) NOT NULL,
  `phoneHolder` varchar(255) NOT NULL,
  `month` varchar(50) NOT NULL,
  `sortOrder` int NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `on_call_rota_id` PRIMARY KEY(`id`)
);

CREATE TABLE `payroll_calendar` (
  `id` int AUTO_INCREMENT NOT NULL,
  `paidFrom` varchar(50) NOT NULL,
  `paidTo` varchar(50) NOT NULL,
  `payDate` varchar(50) NOT NULL,
  `year` int NOT NULL,
  `sortOrder` int NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `payroll_calendar_id` PRIMARY KEY(`id`)
);

CREATE TABLE `quick_links` (
  `id` int AUTO_INCREMENT NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` text NOT NULL,
  `description` text,
  `category` varchar(100),
  `isActive` boolean NOT NULL DEFAULT true,
  `sortOrder` int NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `quick_links_id` PRIMARY KEY(`id`)
);

CREATE TABLE `clients` (
  `id` int AUTO_INCREMENT NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255),
  `status` enum('active','inactive','hospital','passed') NOT NULL DEFAULT 'active',
  `note` text,
  `isActive` boolean NOT NULL DEFAULT true,
  `sortOrder` int NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `clients_id` PRIMARY KEY(`id`)
);
