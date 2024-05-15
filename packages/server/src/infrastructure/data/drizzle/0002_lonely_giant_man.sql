ALTER TABLE "posts" RENAME COLUMN "author" TO "user";--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "posts_author_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
