/*
  Warnings:

  - Added the required column `userId` to the `FamilyMember` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FamilyMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthDate" DATETIME,
    "deathDate" DATETIME,
    "birthPlace" TEXT,
    "pictureUrl" TEXT,
    "parentId1" TEXT,
    "parentId2" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "FamilyMember_parentId1_fkey" FOREIGN KEY ("parentId1") REFERENCES "FamilyMember" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FamilyMember_parentId2_fkey" FOREIGN KEY ("parentId2") REFERENCES "FamilyMember" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FamilyMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FamilyMember" ("birthDate", "birthPlace", "createdAt", "deathDate", "fullName", "gender", "id", "parentId1", "parentId2", "pictureUrl", "updatedAt") SELECT "birthDate", "birthPlace", "createdAt", "deathDate", "fullName", "gender", "id", "parentId1", "parentId2", "pictureUrl", "updatedAt" FROM "FamilyMember";
DROP TABLE "FamilyMember";
ALTER TABLE "new_FamilyMember" RENAME TO "FamilyMember";
CREATE INDEX "FamilyMember_userId_idx" ON "FamilyMember"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
