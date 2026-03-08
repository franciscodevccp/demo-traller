"use client";

import { useState } from "react";
import { useProducts } from "@/store/ProductsContext";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { EditProductModal } from "@/components/EditProductModal";
import { Package, AlertTriangle, ChevronRight } from "lucide-react";

export default function InventarioPage() {
  const { products } = useProducts();
  const [modalProductId, setModalProductId] = useState<string | null>(null);
  const [editModalProductId, setEditModalProductId] = useState<string | null>(null);
  const totalUnidades = products.reduce((sum, p) => sum + p.stock, 0);
  const conStockBajo = products.filter((p) => p.stock < 10);
  const ordenadoPorStock = [...products].sort((a, b) => a.stock - b.stock);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6 lg:gap-8 lg:p-8">
      <div>
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">Inventario</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Estado del stock de repuestos
        </p>
      </div>

      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
          <div className="flex items-center gap-2">
            <Package className="size-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Total unidades
            </span>
          </div>
          <p className="mt-1 text-2xl font-bold">{totalUnidades}</p>
        </div>
        <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Productos con stock bajo
            </span>
          </div>
          <p className="mt-1 text-2xl font-bold">{conStockBajo.length}</p>
        </div>
      </div>

      {/* Vista en tarjetas para móvil */}
      <div className="flex flex-col gap-3 md:hidden">
        {ordenadoPorStock.map((p) => (
          <Card key={p.id}>
            <button
              type="button"
              onClick={() => setModalProductId(p.id)}
              className="block w-full text-left"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs text-muted-foreground">{p.code}</p>
                    <p className="font-medium mt-0.5">{p.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{p.brand}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm font-medium">Stock: {p.stock}</span>
                      <Badge variant={p.stock < 10 ? "destructive" : "secondary"} className="text-xs">
                        {p.stock < 10 ? "Stock bajo" : "OK"}
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
                </div>
              </CardContent>
            </button>
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

      <EditProductModal
        productId={editModalProductId}
        open={!!editModalProductId}
        onOpenChange={(open) => !open && setEditModalProductId(null)}
      />

      {/* Tabla para tablet y desktop */}
      <div className="hidden md:block overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[400px] text-sm lg:text-base">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="w-24 p-3 text-left font-medium lg:w-28 lg:p-4">Código</th>
              <th className="min-w-[200px] p-3 text-left font-medium lg:min-w-[280px] lg:p-4">Nombre</th>
              <th className="w-28 p-3 text-left font-medium lg:w-36 lg:p-4">Marca</th>
              <th className="w-20 p-3 text-right font-medium lg:w-24 lg:p-4">Stock</th>
              <th className="w-24 p-3 text-right font-medium lg:w-28 lg:p-4">Estado</th>
            </tr>
          </thead>
          <tbody>
            {ordenadoPorStock.map((p) => (
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
                <td className="whitespace-nowrap p-3 text-right font-medium lg:p-4">{p.stock}</td>
                <td className="p-3 text-right lg:p-4">
                  <Badge variant={p.stock < 10 ? "destructive" : "secondary"}>
                    {p.stock < 10 ? "Stock bajo" : "OK"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
