/*
  Warnings:

  - You are about to drop the `Characters` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Characters";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "dissidia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Series" TEXT NOT NULL,
    "Role" TEXT NOT NULL,
    "Deity" TEXT NOT NULL,
    "Description" TEXT,
    "fileName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
