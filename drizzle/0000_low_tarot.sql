CREATE TABLE `telegram_subscribers` (
	`chat_id` text PRIMARY KEY NOT NULL,
	`display_name` text,
	`subscribed_at` integer NOT NULL
);
