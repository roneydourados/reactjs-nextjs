-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "category_name" VARCHAR(80) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "product_name" VARCHAR(100) NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "ammount" DECIMAL(18,2) NOT NULL,
    "photo" VARCHAR(500) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "category_category_name_idx" ON "category"("category_name");

-- CreateIndex
CREATE INDEX "product_product_name_idx" ON "product"("product_name");

-- CreateIndex
CREATE INDEX "product_categoryId_idx" ON "product"("categoryId");

-- CreateIndex
CREATE INDEX "city_name_idx" ON "city"("name");

-- CreateIndex
CREATE INDEX "users_name_idx" ON "users"("name");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
