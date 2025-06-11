/*
  Warnings:

  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- Add password column with default value first
ALTER TABLE "Users" ADD COLUMN "password" TEXT NOT NULL DEFAULT 'temp_password';

-- Update null names to default value
UPDATE "Users" SET "name" = 'ユーザー' WHERE "name" IS NULL;

-- Make name column NOT NULL
ALTER TABLE "Users" ALTER COLUMN "name" SET NOT NULL;
