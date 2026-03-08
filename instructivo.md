
Instructivo Técnico
Software de Gestión de Repuestos Automotrices
 
Stack: Next.js 14 + TypeScript + Mock Data
Package Manager: pnpm
Preparado por: Francisco Dev
Marzo 2026
 
1. Resumen del Proyecto
Sistema web para gestionar el inventario de un local de repuestos automotrices. El objetivo principal es resolver tres problemas que el cliente enfrenta actualmente con Excel:
•	Descripciones de productos limitadas en caracteres.
•	Imposibilidad de buscar una pieza por sus múltiples nombres o alias (ej: una rótula puede tener hasta 50 nombres distintos).
•	No existe cruce de información entre productos compatibles o reemplazos.

1.1 Alcance de la Maqueta
Esta primera versión funciona 100% con datos mock (sin base de datos real). Esto permite al cliente probar la lógica de búsqueda y cruces antes de invertir en el desarrollo completo.
2. Arquitectura del Sistema
2.1 Stack Tecnológico
Componente	Tecnología	Versión
Framework	Next.js (App Router)	14.x
Lenguaje	TypeScript	5.x
Estilos	Tailwind CSS	3.x
Búsqueda	Fuse.js (fuzzy search)	7.x
Iconos	Lucide React	0.x
Package Manager	pnpm	9.x
Datos	Mock JSON (local)	-

2.2 Estructura de Carpetas
repuestos-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Dashboard principal
│   │   ├── productos/
│   │   │   ├── page.tsx              # Listado de productos
│   │   │   └── [id]/page.tsx         # Detalle de producto
│   │   └── buscar/page.tsx           # Búsqueda avanzada
│   ├── components/
│   │   ├── SearchBar.tsx             # Barra de búsqueda con fuzzy
│   │   ├── ProductCard.tsx           # Tarjeta de producto
│   │   ├── ReplacementList.tsx       # Lista de reemplazos
│   │   ├── AliasBadges.tsx           # Badges con alias
│   │   └── Sidebar.tsx               # Navegación lateral
│   ├── data/
│   │   ├── products.ts               # Mock de productos
│   │   ├── aliases.ts                # Mock de alias/sinónimos
│   │   └── replacements.ts           # Mock de reemplazos
│   ├── lib/
│   │   ├── search.ts                 # Lógica de búsqueda fuzzy
│   │   └── types.ts                  # Tipos TypeScript
│   └── hooks/
│       └── useSearch.ts              # Hook de búsqueda
├── package.json
├── tailwind.config.ts
└── tsconfig.json
3. Modelo de Datos (Mock)
Aunque no usamos base de datos real, el modelo está diseñado para migrar fácilmente a PostgreSQL cuando se apruebe el desarrollo completo.
3.1 Tipos TypeScript
// lib/types.ts

export interface Product {
  id: string;
  code: string;                    // Código interno del local
  name: string;                    // Nombre principal
  description: string;             // Descripción larga, SIN LÍMITE
  brand: string;                   // Marca del repuesto
  category: string;                // Categoría (suspensión, frenos, etc.)
  price: number;
  stock: number;
  compatibleVehicles: string[];    // Vehículos compatibles
  imageUrl?: string;
}

export interface ProductAlias {
  productId: string;
  alias: string;                   // Nombre alternativo
}

export interface Replacement {
  productId: string;               // Producto original
  replacementId: string;           // Producto que lo reemplaza
  type: 'exact' | 'compatible';    // Reemplazo exacto o compatible
  notes?: string;                  // Notas sobre compatibilidad
}

3.2 Ejemplo de Datos Mock
// data/products.ts

export const products: Product[] = [
  {
    id: 'prod-001',
    code: 'ROT-001',
    name: 'Rótula de Dirección Derecha',
    description: 'Rótula de dirección lado derecho...
      (descripción extensa sin límite de caracteres)',
    brand: 'Monroe',
    category: 'Suspensión y Dirección',
    price: 25990,
    stock: 12,
    compatibleVehicles: [
      'Toyota Corolla 2014-2019',
      'Toyota Yaris 2015-2020'
    ]
  }
];

// data/aliases.ts

export const aliases: ProductAlias[] = [
  { productId: 'prod-001', alias: 'Rótula' },
  { productId: 'prod-001', alias: 'Terminal de dirección' },
  { productId: 'prod-001', alias: 'Cabeza de biela' },
  { productId: 'prod-001', alias: 'Ball joint' },
  { productId: 'prod-001', alias: 'Rótula axial' },
  { productId: 'prod-001', alias: 'Extremo de dirección' },
  // ... hasta 50 alias por producto
];

// data/replacements.ts

export const replacements: Replacement[] = [
  {
    productId: 'prod-001',
    replacementId: 'prod-002',
    type: 'exact',
    notes: 'Mismo modelo, marca diferente'
  }
];
 
4. Instalación y Configuración
4.1 Requisitos Previos
•	Node.js 18+ instalado
•	pnpm instalado globalmente: npm install -g pnpm

4.2 Crear el Proyecto
pnpm create next-app@latest repuestos-app --typescript --tailwind --app --src-dir --eslint
cd repuestos-app

4.3 Instalar Dependencias
Librerías principales:
pnpm add fuse.js lucide-react clsx

Librerías de desarrollo (ya incluidas por Next.js pero bueno confirmar):
pnpm add -D @types/node @types/react @types/react-dom

4.4 Detalle de Cada Librería
Librería	Para qué sirve	Instalación
next	Framework React con SSR, routing, API routes	Incluido
typescript	Tipado estático para evitar errores	Incluido
tailwindcss	Estilos utility-first, rápido para prototipar	Incluido
fuse.js	Búsqueda fuzzy: encuentra resultados aunque el usuario escriba con errores o use sinónimos parciales	pnpm add fuse.js
lucide-react	Iconos SVG modernos y livianos	pnpm add lucide-react
clsx	Utilidad para clases CSS condicionales	pnpm add clsx

5. Lógica de Búsqueda (El Core del Sistema)
Esta es la parte más crítica y la que resuelve el problema principal del cliente: buscar por cualquiera de los nombres alternativos de una pieza.
5.1 Cómo Funciona Fuse.js
Fuse.js es una librería de búsqueda fuzzy (difusa) que funciona en el cliente. Permite buscar texto aunque el usuario cometa errores de escritura o use variaciones del nombre.

Ejemplo: El cliente busca "rotla" (sin tilde, con typo) y el sistema igual encuentra "Rótula de Dirección".

5.2 Configuración de la Búsqueda
// lib/search.ts
import Fuse from 'fuse.js';
import { products } from '@/data/products';
import { aliases } from '@/data/aliases';

// Crear índice de búsqueda combinando productos + alias
const searchIndex = products.map(product => ({
  ...product,
  aliases: aliases
    .filter(a => a.productId === product.id)
    .map(a => a.alias)
}));

const fuse = new Fuse(searchIndex, {
  keys: [
    { name: 'name', weight: 1.0 },
    { name: 'aliases', weight: 0.9 },
    { name: 'code', weight: 0.8 },
    { name: 'description', weight: 0.5 },
    { name: 'brand', weight: 0.4 },
  ],
  threshold: 0.4,        // Tolerancia a errores (0=exacto, 1=todo)
  includeScore: true,
  minMatchCharLength: 2,
});

export function searchProducts(query: string) {
  return fuse.search(query).map(result => result.item);
}
Los weights (pesos) definen prioridad: el nombre principal tiene más peso que la descripción. El threshold en 0.4 permite errores de escritura sin ser demasiado permisivo.
 
6. Flujo de Usuario
6.1 Búsqueda de Producto
1.	El usuario escribe en la barra de búsqueda (ej: "terminal dirección")
2.	Fuse.js busca en: nombre principal, todos los alias, código, descripción y marca
3.	Se muestran los resultados ordenados por relevancia
4.	Cada resultado muestra: nombre, código, precio, stock y badges con los alias que hicieron match

6.2 Detalle de Producto
1.	El usuario hace clic en un producto
2.	Se muestra la ficha completa: descripción larga, todos los alias, vehículos compatibles
3.	Sección "Reemplazos y Compatibles": lista de productos que pueden sustituir a este, con tipo (exacto o compatible) y notas
4.	Cada reemplazo es clickeable y lleva a su propia ficha

6.3 Gestión de Productos (Admin)
1.	Agregar producto nuevo con todos sus campos
2.	Agregar/eliminar alias (sin límite de cantidad)
3.	Vincular reemplazos y compatibles entre productos
4.	Editar stock y precios
7. Pantallas Principales
7.1 Dashboard
•	Resumen de total de productos, productos con stock bajo, últimas búsquedas
•	Acceso rápido a búsqueda y categorías

7.2 Listado de Productos
•	Tabla/grilla con filtros por categoría, marca, stock
•	Búsqueda inline con resultados instantáneos
•	Paginación

7.3 Ficha de Producto
•	Información completa del producto
•	Sección de alias (todos los nombres alternativos)
•	Sección de reemplazos con links cruzados
•	Vehículos compatibles

7.4 Búsqueda Avanzada
•	Campo de búsqueda principal con resultados en tiempo real
•	Filtros laterales: categoría, marca, rango de precio
•	Resultados muestran por qué hicieron match (nombre, alias, código)
 
8. Comandos de Desarrollo
Comando	Descripción
pnpm dev	Inicia servidor de desarrollo (localhost:3000)
pnpm build	Compila para producción
pnpm start	Inicia servidor de producción
pnpm lint	Ejecuta el linter
pnpm add [paquete]	Instala una nueva dependencia
pnpm add -D [paquete]	Instala dependencia de desarrollo

9. Migración Futura a Base de Datos Real
Cuando el cliente apruebe el desarrollo completo, la migración de mock a PostgreSQL + Supabase es directa:
Mock Actual	Producción
Archivos .ts con arrays	Tablas PostgreSQL en Supabase
Fuse.js (búsqueda client-side)	PostgreSQL Full-Text Search + trgm
Datos en memoria	Datos persistentes en la nube
Sin autenticación	Login con Supabase Auth
Un solo usuario	Multi-usuario con roles

La estructura de tipos TypeScript se mantiene idéntica. Solo cambia la fuente de datos: en vez de importar de archivos locales, se consulta a Supabase.
10. Resumen Rápido de Instalación
# 1. Crear proyecto
pnpm create next-app@latest repuestos-app \
  --typescript --tailwind --app --src-dir --eslint

# 2. Entrar al proyecto
cd repuestos-app

# 3. Instalar dependencias extra
pnpm add fuse.js lucide-react clsx

# 4. Crear estructura de carpetas
mkdir -p src/data src/lib src/hooks src/components

# 5. Iniciar desarrollo
pnpm dev

 
Francisco Dev — franciscodev.cl
