import type { Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: "prod-001",
    code: "ROT-001",
    name: "Rótula de Dirección Derecha",
    description:
      "Rótula de dirección lado derecho para sistema de dirección. Fabricada en acero de alta resistencia con tratamiento anticorrosivo. Incluye grasa de alta duración. Garantiza precisión en el direccionamiento y mayor vida útil. Compatible con sistemas de dirección de cremallera.",
    brand: "Monroe",
    category: "Suspensión y Dirección",
    price: 25990,
    stock: 12,
    compatibleVehicles: [
      "Toyota Corolla 2014-2019",
      "Toyota Yaris 2015-2020",
    ],
  },
  {
    id: "prod-002",
    code: "ROT-002",
    name: "Rótula de Dirección Derecha (Compatible)",
    description:
      "Rótula de dirección derecha, reemplazo de calidad para Monroe y marcas OEM. Mismo estándar de resistencia y durabilidad. Ideal como alternativa de menor costo manteniendo garantía de funcionamiento.",
    brand: "TRW",
    category: "Suspensión y Dirección",
    price: 22990,
    stock: 8,
    compatibleVehicles: [
      "Toyota Corolla 2014-2019",
      "Toyota Yaris 2015-2020",
    ],
  },
  {
    id: "prod-003",
    code: "DIS-001",
    name: "Disco de Freno Delantero",
    description:
      "Disco de freno delantero ventilado, diámetro 288mm. Material de alta resistencia al calor y al desgaste. Superficie maquinada para óptimo contacto con las pastillas. Incluye orificios de ventilación para mejor disipación del calor en frenados intensos.",
    brand: "Brembo",
    category: "Frenos",
    price: 45990,
    stock: 6,
    compatibleVehicles: [
      "Volkswagen Gol 2010-2018",
      "Volkswagen Voyage 2010-2018",
    ],
  },
  {
    id: "prod-004",
    code: "FIL-001",
    name: "Filtro de Aceite",
    description:
      "Filtro de aceite de celulosa de alta eficiencia. Retiene partículas y sedimentos para mantener el aceite limpio y prolongar la vida del motor. Sellado de goma de alta duración. Rosca estándar métrica.",
    brand: "Mann Filter",
    category: "Filtros",
    price: 8990,
    stock: 45,
    compatibleVehicles: [
      "Chevrolet Onix 2012-2024",
      "Chevrolet Prisma 2012-2020",
    ],
  },
];
