/*
  Warnings:

  - You are about to drop the column `pictureUrl` on the `FamilyMember` table. All the data in the column will be lost.

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
    "picture" BLOB,
    "parentId1" INTEGER,
    "parentId2" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "FamilyMember_parentId1_fkey" FOREIGN KEY ("parentId1") REFERENCES "FamilyMember" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FamilyMember_parentId2_fkey" FOREIGN KEY ("parentId2") REFERENCES "FamilyMember" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FamilyMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FamilyMember" ("birthDate", "birthPlace", "createdAt", "deathDate", "fullName", "gender", "id", "parentId1", "parentId2", "updatedAt", "userId") SELECT "birthDate", "birthPlace", "createdAt", "deathDate", "fullName", "gender", "id", "parentId1", "parentId2", "updatedAt", "userId" FROM "FamilyMember";
DROP TABLE "FamilyMember";
ALTER TABLE "new_FamilyMember" RENAME TO "FamilyMember";
CREATE INDEX "FamilyMember_userId_idx" ON "FamilyMember"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
