-- Puntos destacados editoriales propios de cada producto.
ALTER TABLE "Product" ADD COLUMN "highlights" TEXT[] DEFAULT ARRAY[]::TEXT[];
