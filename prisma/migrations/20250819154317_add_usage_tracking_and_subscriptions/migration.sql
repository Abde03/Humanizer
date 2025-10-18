-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "subscriptionEnd" TIMESTAMP(3),
ADD COLUMN     "subscriptionId" TEXT,
ADD COLUMN     "subscriptionStatus" TEXT,
ADD COLUMN     "usageCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "wordsUsed" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Humanization" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "originalText" TEXT NOT NULL,
    "humanizedText" TEXT NOT NULL,
    "wordCount" INTEGER NOT NULL,
    "style" TEXT NOT NULL DEFAULT 'professional',
    "language" TEXT NOT NULL DEFAULT 'en',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Humanization_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Humanization" ADD CONSTRAINT "Humanization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
