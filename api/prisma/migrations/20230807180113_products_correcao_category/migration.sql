/*
  Warnings:

  - You are about to drop the column `cateogy_id` on the `product` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_cateogy_id_fkey";

-- DropIndex
DROP INDEX "product_cateogy_id_idx";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "cateogy_id",
ADD COLUMN     "category_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "product_category_id_idx" ON "product"("category_id");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
