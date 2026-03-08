"use client";

import { useState } from "react";
import { useProducts } from "@/store/ProductsContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { AddProductModal } from "@/components/AddProductModal";
import { EditProductModal } from "@/components/EditProductModal";
import { Plus, ChevronRight, Pencil } from "lucide-react";

export default function ProductosPage() {
  const { products } = useProducts();
  const [modalProductId, setModalProductId] = useState<string | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalProductId, setEditModalProductId] = useState<string | null>(null);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6 lg:gap-8 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">Productos</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Listado de repuestos en inventario
          </p>
        </div>
        <Button
          type="button"
          className="w-full shrink-0 sm:w-auto"
          onClick={() => setAddModalOpen(true)}
        >
          <Plus className="size-4" />
          Agregar producto
        </Button>
      </div>

      {/* Vista en tarjetas para móvil */}
      <div className="flex flex-col gap-3 md:hidden">
        {products.map((p) => (
          <Card key={p.id} className="overflow-hidden">
            <button
              type="button"
              onClick={() => setModalProductId(p.id)}
              className="block w-full text-left"
            >
              <CardContent className="p-4 pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs text-muted-foreground">{p.code}</p>
                    <p className="font-medium text-foreground mt-0.5">{p.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{p.brand} · {p.category}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium">${p.price.toLocaleString("es-CL")}</span>
                      <Badge variant={p.stock < 10 ? "destructive" : "secondary"} className="text-xs">
                        Stock: {p.stock}
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
                </div>
              </CardContent>
            </button>
            <div className="flex gap-2 border-t px-4 py-2.5">
              <Button
                size="sm"
                className="h-9 min-w-0 flex-1 gap-1.5"
                onClick={() => setModalProductId(p.id)}
              >
                Ver
              </Button>
              <Button
                size="sm"
                className="h-9 min-w-0 flex-1 gap-1.5"
                onClick={() => setEditModalProductId(p.id)}
              >
                <Pencil className="size-4" />
                Editar
              </Button>
            </div>
          </Card>
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

      <AddProductModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
      />

      <EditProductModal
        productId={editModalProductId}
        open={!!editModalProductId}
        onOpenChange={(open) => !open && setEditModalProductId(null)}
      />

      {/* Tabla para tablet y desktop */}
      <div className="hidden md:block overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[640px] text-sm lg:text-base">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="w-24 p-3 text-left font-medium lg:w-28 lg:p-4">Código</th>
              <th className="min-w-[200px] p-3 text-left font-medium lg:min-w-[280px] lg:p-4">Nombre</th>
              <th className="w-28 p-3 text-left font-medium lg:w-36 lg:p-4">Marca</th>
              <th className="min-w-[140px] p-3 text-left font-medium lg:p-4">Categoría</th>
              <th className="w-24 p-3 text-right font-medium lg:w-28 lg:p-4">Precio</th>
              <th className="w-20 p-3 text-right font-medium lg:w-24 lg:p-4">Stock</th>
              <th className="w-24 p-3 text-right font-medium lg:w-28 lg:p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-muted/30">
                <td className="whitespace-nowrap p-3 font-mono text-muted-foreground lg:p-4">{p.code}</td>
                <td className="min-w-[200px] p-3 lg:min-w-[280px] lg:p-4">
                  <button
                    type="button"
                    onClick={() => setModalProductId(p.id)}
                    className="font-medium text-primary underline-offset-4 hover:underline text-left"
                  >
                    {p.name}
                  </button>
                </td>
                <td className="whitespace-nowrap p-3 lg:p-4">{p.brand}</td>
                <td className="whitespace-nowrap p-3 lg:p-4">{p.category}</td>
                <td className="whitespace-nowrap p-3 text-right lg:p-4">
                  ${p.price.toLocaleString("es-CL")}
                </td>
                <td className="p-3 text-right lg:p-4">
                  <Badge variant={p.stock < 10 ? "destructive" : "secondary"}>
                    {p.stock}
                  </Badge>
                </td>
                <td className="whitespace-nowrap p-3 text-right lg:p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditModalProductId(p.id)}
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
