/*
  Warnings:

  - You are about to drop the column `categoryId` on the `product` table. All the data in the column will be lost.
  - Added the required column `cateogy_id` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_categoryId_fkey";

-- DropIndex
DROP INDEX "product_categoryId_idx";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "categoryId",
ADD COLUMN     "cateogy_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "product_cateogy_id_idx" ON "product"("cateogy_id");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_cateogy_id_fkey" FOREIGN KEY ("cateogy_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
