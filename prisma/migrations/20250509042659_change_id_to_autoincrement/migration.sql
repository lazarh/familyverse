/*
  Warnings:

  - The primary key for the `FamilyMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `FamilyMember` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `parentId1` on the `FamilyMember` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `parentId2` on the `FamilyMember` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `userId` on the `FamilyMember` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FamilyMember" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthDate" DATETIME,
    "deathDate" DATETIME,
    "birthPlace" TEXT,
    "pictureUrl" TEXT,
    "parentId1" INTEGER,
    "parentId2" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "FamilyMember_parentId1_fkey" FOREIGN KEY ("parentId1") REFERENCES "FamilyMember" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FamilyMember_parentId2_fkey" FOREIGN KEY ("parentId2") REFERENCES "FamilyMember" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FamilyMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FamilyMember" ("birthDate", "birthPlace", "createdAt", "deathDate", "fullName", "gender", "id", "parentId1", "parentId2", "pictureUrl", "updatedAt", "userId") SELECT "birthDate", "birthPlace", "createdAt", "deathDate", "fullName", "gender", "id", "parentId1", "parentId2", "pictureUrl", "updatedAt", "userId" FROM "FamilyMember";
DROP TABLE "FamilyMember";
ALTER TABLE "new_FamilyMember" RENAME TO "FamilyMember";
CREATE INDEX "FamilyMember_userId_idx" ON "FamilyMember"("userId");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "id", "password", "updatedAt") SELECT "createdAt", "email", "id", "password", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
