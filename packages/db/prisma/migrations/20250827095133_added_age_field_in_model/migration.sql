/*
  Warnings:

  - Added the required column `age` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Model" ADD COLUMN     "age" TEXT NOT NULL;
