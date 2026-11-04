-- Guías editoriales a base de datos (Fase 3, 3a parte): la tabla
-- Guide ya existía (slug, título, intro, estado, items) pero no se
-- usaba; se amplía con los campos que vivían en
-- src/modules/guides/content.ts. sections/groups son JSONB: la
-- prosa se lee entera y se renderiza, sin consultas por campo.
ALTER TABLE "Guide" ADD COLUMN "description" TEXT;
ALTER TABLE "Guide" ADD COLUMN "categorySlug" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Guide" ADD COLUMN "categoryLabel" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Guide" ADD COLUMN "readingMinutes" INTEGER NOT NULL DEFAULT 3;
ALTER TABLE "Guide" ADD COLUMN "verdict" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Guide" ADD COLUMN "sections" JSONB;
ALTER TABLE "Guide" ADD COLUMN "groups" JSONB;
ALTER TABLE "Guide" ADD COLUMN "position" INTEGER NOT NULL DEFAULT 0;
