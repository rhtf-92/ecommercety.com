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
  // Fase 2 (Sprint 8, 2026-11-01): categorías nuevas de la expansión
  // exhaustiva del catálogo maestro 2026, aprobadas por Renato.
  { slug: "toys-games", nameEn: "Toys & Games", phase: 2, commissionRate: 3.0 },
  { slug: "baby-products", nameEn: "Baby Products", phase: 2, commissionRate: 3.0 },
  { slug: "fashion-accessories", nameEn: "Fashion & Accessories", phase: 2, commissionRate: 4.0 },
  { slug: "automotive", nameEn: "Automotive", phase: 2, commissionRate: 4.5 },
  { slug: "office-products", nameEn: "Office & School Supplies", phase: 2, commissionRate: 3.0 },
  { slug: "video-games", nameEn: "Video Games & Electronics", phase: 2, commissionRate: 1.0 },
  { slug: "health-household", nameEn: "Health & Household", phase: 2, commissionRate: 1.0 },
  { slug: "grocery-gourmet", nameEn: "Grocery & Gourmet Gifts", phase: 2, commissionRate: 1.0 },
];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }
  console.log(`Seed completado: ${categories.length} categorías (Fase 1 + Fase 2).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
