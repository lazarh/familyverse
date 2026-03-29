CREATE TABLE `families` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`createdAt` integer,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE TABLE `family_members` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`fullName` text NOT NULL,
	`gender` text NOT NULL,
	`birthDate` integer,
	`deathDate` integer,
	`birthPlace` text,
	`picture` blob,
	`parentId1` integer,
	`parentId2` integer,
	`familyId` integer NOT NULL,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`familyId`) REFERENCES `families`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user_families` (
	`userId` integer NOT NULL,
	`familyId` integer NOT NULL,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`familyId`) REFERENCES `families`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`isConfirmed` integer DEFAULT false,
	`confirmationToken` text,
	`confirmationTokenExpiry` integer,
	`createdAt` integer,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);