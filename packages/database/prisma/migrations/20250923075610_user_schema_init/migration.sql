-- CreateEnum
CREATE TYPE "public"."AuthType" AS ENUM ('Google');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "image" TEXT,
    "oauth_id" TEXT NOT NULL,
    "provider" "public"."AuthType" NOT NULL DEFAULT 'Google',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_number_key" ON "public"."User"("number");

-- CreateIndex
CREATE UNIQUE INDEX "User_oauth_id_key" ON "public"."User"("oauth_id");
