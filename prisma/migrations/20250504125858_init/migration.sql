-- CreateTable
CREATE TABLE "FamilyMember" (
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
    CONSTRAINT "FamilyMember_parentId1_fkey" FOREIGN KEY ("parentId1") REFERENCES "FamilyMember" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FamilyMember_parentId2_fkey" FOREIGN KEY ("parentId2") REFERENCES "FamilyMember" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
