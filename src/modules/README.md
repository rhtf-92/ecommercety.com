# Módulos del dominio (monolito modular)

Cada carpeta es un módulo con responsabilidad única. Los módulos se comunican
por funciones/servicios públicos del módulo, nunca accediendo a las tablas de
otro módulo directamente fuera de su capa de datos compartida (Prisma).

- `catalog/`: categorías y productos (fichas, estados, publicación).
- `guides/`: guías y comparativas editoriales.
- `affiliate/`: enlaces SiteStripe y Tracking IDs por canal (`tracking.ts`).
- `analytics/`: registro y agregación de clics salientes a Amazon.
- `audit/`: registro de cambios con antes/después (AuditLog).
- `verification/`: ciclo de verificación de productos cada 5 horas.
- `trends/`: radar de tendencias de la hora 3 y cola de candidatos.
- `admin/`: panel de administración (en español).
