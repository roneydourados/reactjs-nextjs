-- DropIndex
DROP INDEX "product_categoryId_idx";

-- CreateIndex
CREATE INDEX "product_categoryId_ammount_idx" ON "product"("categoryId", "ammount");
