DELETE FROM "bots";

ALTER TABLE "bots"
    DROP COLUMN "ambition",
    DROP COLUMN "composure",
    DROP COLUMN "vision",
    ADD COLUMN  "engine" VARCHAR(64) NOT NULL,
    ADD COLUMN  "meta"   JSONB       NOT NULL;
