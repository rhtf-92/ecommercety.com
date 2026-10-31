import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Categorías estratégicas de la Fase 1, aprobadas por Renato el 2026-10-31.
// commissionRate: % de referencia del programa Amazon Associates EE. UU.
const categories = [
  { slug: "home-kitchen", nameEn: "Home & Kitchen", phase: 1, commissionRate: 3.0 },
  { slug: "tech-smart-home", nameEn: "Tech, Accessories & Smart Home", phase: 1, commissionRate: 3.0 },
  { slug: "beauty-personal-care", nameEn: "Beauty & Personal Care", phase: 1, commissionRate: 3.0 },
  { slug: "pet-supplies", nameEn: "Pet Supplies", phase: 1, commissionRate: 3.0 },
  { slug: "sports-outdoors", nameEn: "Sports, Fitness & Outdoors", phase: 1, commissionRate: 3.0 },
  { slug: "tools-home-improvement", nameEn: "Tools & Home Improvement", phase: 1, commissionRate: 3.0 },
];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }
  console.log(`Seed completado: ${categories.length} categorías de Fase 1.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
