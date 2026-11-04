-- Búsquedas internas de la página /search (Fase 3, 2a parte):
-- solo término normalizado, nº de resultados y momento. Sin IP,
-- sin usuario, sin cookies: demanda agregada, no perfilado.
CREATE TABLE "SearchLog" (
    "id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "resultCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SearchLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "SearchLog_term_createdAt_idx" ON "SearchLog"("term", "createdAt");
CREATE INDEX "SearchLog_createdAt_idx" ON "SearchLog"("createdAt");
