/*
  Warnings:

  - Added the required column `prompt` to the `OutputImages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `OutputImages` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."OutputImagesStatus" AS ENUM ('Pending', 'generated', 'Failed');

-- AlterTable
ALTER TABLE "public"."OutputImages" ADD COLUMN     "prompt" TEXT NOT NULL,
ADD COLUMN     "status" "public"."OutputImagesStatus" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "userId" TEXT NOT NULL;
