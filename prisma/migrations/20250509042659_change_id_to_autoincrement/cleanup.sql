-- Cleanup script to drop partially created tables
PRAGMA foreign_keys=OFF;
DROP TABLE IF EXISTS new_FamilyMember;
DROP TABLE IF EXISTS new_User;
PRAGMA foreign_keys=ON;