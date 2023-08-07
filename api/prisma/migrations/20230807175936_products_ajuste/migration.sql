-- DropIndex
DROP INDEX "product_categoryId_ammount_idx";

-- CreateIndex
CREATE INDEX "product_categoryId_idx" ON "product"("categoryId");
