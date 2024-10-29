CREATE TABLE `score` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text,
	`score` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `score_username_unique` ON `score` (`username`);