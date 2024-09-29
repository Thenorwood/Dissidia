/*
  Warnings:

  - You are about to drop the column `fileName` on the `dissidia` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_dissidia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Series" TEXT NOT NULL,
    "Role" TEXT NOT NULL,
    "Deity" TEXT NOT NULL,
    "Description" TEXT,
    "filename" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_dissidia" ("Deity", "Description", "Name", "Role", "Series", "createdAt", "id") SELECT "Deity", "Description", "Name", "Role", "Series", "createdAt", "id" FROM "dissidia";
DROP TABLE "dissidia";
ALTER TABLE "new_dissidia" RENAME TO "dissidia";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
