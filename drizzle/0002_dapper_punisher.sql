CREATE TABLE `service_area_content` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`customContent` text NOT NULL,
	`lastRefreshed` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `service_area_content_id` PRIMARY KEY(`id`),
	CONSTRAINT `service_area_content_slug_unique` UNIQUE(`slug`)
);
