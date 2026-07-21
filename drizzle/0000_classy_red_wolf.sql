CREATE TABLE `availability` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`room_slug` text NOT NULL,
	`date` text NOT NULL,
	`available_rooms` integer NOT NULL,
	`price_override` integer,
	`note` text DEFAULT '' NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `availability_room_date_idx` ON `availability` (`room_slug`,`date`);--> statement-breakpoint
CREATE INDEX `availability_date_idx` ON `availability` (`date`);--> statement-breakpoint
CREATE TABLE `bookings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`reference` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`source` text DEFAULT 'Website' NOT NULL,
	`room_slug` text NOT NULL,
	`room_name` text NOT NULL,
	`guest_name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text DEFAULT '' NOT NULL,
	`check_in` text NOT NULL,
	`check_out` text NOT NULL,
	`guests` integer NOT NULL,
	`meal_plan` text DEFAULT 'Room only' NOT NULL,
	`total` integer DEFAULT 0 NOT NULL,
	`arrival` text DEFAULT '' NOT NULL,
	`requests` text DEFAULT '' NOT NULL,
	`payment_method` text DEFAULT 'Pay at hotel' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bookings_reference_idx` ON `bookings` (`reference`);--> statement-breakpoint
CREATE INDEX `bookings_check_in_idx` ON `bookings` (`check_in`);--> statement-breakpoint
CREATE INDEX `bookings_status_idx` ON `bookings` (`status`);--> statement-breakpoint
CREATE TABLE `enquiries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text DEFAULT 'general' NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text DEFAULT '' NOT NULL,
	`preferred_date` text DEFAULT '' NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`source` text DEFAULT 'Website' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `enquiries_status_idx` ON `enquiries` (`status`);--> statement-breakpoint
CREATE TABLE `meal_options` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`price_per_guest` integer DEFAULT 0 NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `meal_options_slug_idx` ON `meal_options` (`slug`);--> statement-breakpoint
CREATE TABLE `room_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`base_price` integer NOT NULL,
	`total_rooms` integer DEFAULT 15 NOT NULL,
	`max_guests` integer DEFAULT 2 NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `room_categories_slug_idx` ON `room_categories` (`slug`);