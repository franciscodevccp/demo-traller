import { SearchPageClient } from "./SearchPageClient";

export default function BuscarPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6 lg:gap-8 lg:p-8">
      <div>
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">Búsqueda</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Busca por nombre, alias, código o descripción
        </p>
      </div>
      <SearchPageClient />
    </div>
  );
}
