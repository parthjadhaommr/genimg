/*
  Warnings:

  - The values [AsianAmerican,SouthEastAsian,SouthAsian,MiddleEastern] on the enum `EthinicityEnum` will be removed. If these variants are still used in the database, this will fail.
  - The values [Others] on the enum `ModleTypeEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."EthinicityEnum_new" AS ENUM ('White', 'Black', 'Asian American', 'South East Asian', 'South Asian', 'Middle Eastern', 'Pacific', 'Hispanic');
ALTER TABLE "public"."Model" ALTER COLUMN "ethnicity" TYPE "public"."EthinicityEnum_new" USING ("ethnicity"::text::"public"."EthinicityEnum_new");
ALTER TYPE "public"."EthinicityEnum" RENAME TO "EthinicityEnum_old";
ALTER TYPE "public"."EthinicityEnum_new" RENAME TO "EthinicityEnum";
DROP TYPE "public"."EthinicityEnum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."ModleTypeEnum_new" AS ENUM ('Man', 'Woman', 'Other');
ALTER TABLE "public"."Model" ALTER COLUMN "type" TYPE "public"."ModleTypeEnum_new" USING ("type"::text::"public"."ModleTypeEnum_new");
ALTER TYPE "public"."ModleTypeEnum" RENAME TO "ModleTypeEnum_old";
ALTER TYPE "public"."ModleTypeEnum_new" RENAME TO "ModleTypeEnum";
DROP TYPE "public"."ModleTypeEnum_old";
COMMIT;
