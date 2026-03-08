"use client";

import { useState } from "react";
import { useProducts } from "@/store/ProductsContext";
import { useSearch } from "@/hooks/useSearch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { EditProductModal } from "@/components/EditProductModal";
import { Search } from "lucide-react";

export function SearchPageClient() {
  const { products, aliases } = useProducts();
  const { query, setQuery, results } = useSearch(products, aliases);
  const [modalProductId, setModalProductId] = useState<string | null>(null);
  const [editModalProductId, setEditModalProductId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Ej: rótula, terminal dirección, ROT-001..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {query.trim() && (
        <p className="text-sm text-muted-foreground">
          {results.length} resultado{results.length !== 1 ? "s" : ""}
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => setModalProductId(product.id)}
            className="block w-full rounded-lg border bg-card p-4 text-left text-card-foreground shadow-sm transition-colors hover:bg-muted/50"
          >
            <p className="font-mono text-xs text-muted-foreground">
              {product.code}
            </p>
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-medium">
                ${product.price.toLocaleString("es-CL")}
              </span>
              <Badge variant="secondary">{product.stock} en stock</Badge>
            </div>
          </button>
        ))}
      </div>

      <ProductDetailModal
        productId={modalProductId}
        open={!!modalProductId}
        onOpenChange={(open) => !open && setModalProductId(null)}
        onEditClick={(id) => {
          setModalProductId(null);
          setEditModalProductId(id);
        }}
      />

      <EditProductModal
        productId={editModalProductId}
        open={!!editModalProductId}
        onOpenChange={(open) => !open && setEditModalProductId(null)}
      />

      {query.trim() && results.length === 0 && (
        <p className="text-center text-muted-foreground">
          No se encontraron productos. Prueba con otro término o alias.
        </p>
      )}
    </div>
  );
}
