import { defineConfig } from "vitest/config";
import path from "node:path";

// Pruebas unitarias de la lógica de negocio (sin base de datos ni red).
// La CI las corre en cada push: npm run test.

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
