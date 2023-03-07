-- CreateTable
CREATE TABLE "bots" (
    "id" SERIAL NOT NULL,
    "nickname" VARCHAR(20) NOT NULL,
    "games_played" INTEGER NOT NULL DEFAULT 0,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "ambition" INTEGER NOT NULL,
    "composure" INTEGER NOT NULL,
    "vision" INTEGER NOT NULL,

    CONSTRAINT "bots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "auth_id" VARCHAR(64) NOT NULL,
    "nickname" VARCHAR(20),
    "profile_title" INTEGER,
    "profile_picture" INTEGER,
    "games_played" INTEGER NOT NULL DEFAULT 0,
    "wins" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
