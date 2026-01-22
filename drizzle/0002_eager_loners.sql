CREATE TABLE `page_content_sections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pageSlug` varchar(255) NOT NULL,
	`sectionKey` varchar(255) NOT NULL,
	`sectionType` varchar(100) NOT NULL,
	`content` text NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `page_content_sections_id` PRIMARY KEY(`id`)
);
