-- Win-back email system: subscriptions and winback_email_logs tables
-- Migration: 0003_winback_email_system

CREATE TABLE `subscriptions` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `plan` varchar(100) NOT NULL,
  `status` enum('active','cancelled','expired','paused') NOT NULL DEFAULT 'active',
  `cancelledAt` timestamp,
  `cancelReason` text,
  `amountPaid` decimal(10,2),
  `currency` varchar(10) NOT NULL DEFAULT 'GBP',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);

CREATE TABLE `winback_email_logs` (
  `id` int AUTO_INCREMENT NOT NULL,
  `subscriptionId` int NOT NULL,
  `userId` int NOT NULL,
  `emailType` enum('7day','30day') NOT NULL,
  `recipientEmail` varchar(320) NOT NULL,
  `status` enum('sent','failed','skipped') NOT NULL DEFAULT 'sent',
  `errorMessage` text,
  `sentAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `winback_email_logs_id` PRIMARY KEY(`id`)
);
