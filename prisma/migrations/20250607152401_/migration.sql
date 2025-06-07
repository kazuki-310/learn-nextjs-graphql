/*
  Warnings:

  - You are about to drop the column `category` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `completedAt` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `progress` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `lastLoginAt` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Activity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_userId_fkey";

-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_ownerId_fkey";

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "category",
DROP COLUMN "completedAt",
DROP COLUMN "endDate",
DROP COLUMN "ownerId",
DROP COLUMN "priority",
DROP COLUMN "progress",
DROP COLUMN "startDate",
DROP COLUMN "status",
DROP COLUMN "tags",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "isActive",
DROP COLUMN "lastLoginAt",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "Activity";

-- DropEnum
DROP TYPE "ActivityType";

-- DropEnum
DROP TYPE "Priority";

-- DropEnum
DROP TYPE "ProjectStatus";
