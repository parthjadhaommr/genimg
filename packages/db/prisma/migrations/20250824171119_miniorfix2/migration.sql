/*
  Warnings:

  - The values [Asian American,South East Asian,South Asian,Middle Eastern] on the enum `EthinicityEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."EthinicityEnum_new" AS ENUM ('White', 'Black', 'Asian_American', 'South_East_Asian', 'South_Asian', 'Middle_Eastern', 'Pacific', 'Hispanic');
ALTER TABLE "public"."Model" ALTER COLUMN "ethnicity" TYPE "public"."EthinicityEnum_new" USING ("ethnicity"::text::"public"."EthinicityEnum_new");
ALTER TYPE "public"."EthinicityEnum" RENAME TO "EthinicityEnum_old";
ALTER TYPE "public"."EthinicityEnum_new" RENAME TO "EthinicityEnum";
DROP TYPE "public"."EthinicityEnum_old";
COMMIT;
