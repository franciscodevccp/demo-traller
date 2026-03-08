"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useProducts } from "@/store/ProductsContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Pencil, Trash2, Package, Car, RefreshCw, Tag, Layers, DollarSign } from "lucide-react";

export default function ProductoDetallePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { products, aliases, replacements, getProductById, deleteProduct } = useProducts();
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6 lg:gap-8 lg:p-8">
        <p className="text-muted-foreground">Producto no encontrado.</p>
        <Button variant="outline" asChild>
          <Link href="/productos">Volver a productos</Link>
        </Button>
      </div>
    );
  }

  const productAliases = aliases.filter((a) => a.productId === product.id);
  const productReplacements = replacements.filter((r) => r.productId === product.id);

  const handleDelete = () => {
    if (window.confirm("¿Eliminar este producto? Se borrarán también sus alias y reemplazos vinculados.")) {
      deleteProduct(id);
      router.push("/productos");
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 p-4 sm:gap-8 sm:p-6 lg:p-8">
      {/* Navegación y acciones */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="ghost" size="sm" asChild className="self-start text-muted-foreground hover:text-foreground">
          <Link href="/productos" className="gap-2">
            <ArrowLeft className="size-4" />
            Volver a productos
          </Link>
        </Button>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild className="gap-2">
            <Link href={`/productos/${id}/editar`}>
              <Pencil className="size-4" />
              Editar
            </Link>
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete} className="gap-2">
            <Trash2 className="size-4" />
            Eliminar
          </Button>
        </div>
      </div>

      {/* Bloque principal: código, nombre, descripción */}
      <Card className="overflow-hidden border-0 bg-muted/30 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {product.code}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight break-words sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </CardContent>
      </Card>

      {/* Atributos principales */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="h-full">
          <CardContent className="flex h-full items-center gap-3 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Package className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Marca</p>
              <p className="font-semibold">{product.brand}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardContent className="flex h-full items-center gap-3 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Tag className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Categoría</p>
              <p className="font-semibold">{product.category}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardContent className="flex h-full items-center gap-3 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Layers className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Stock</p>
              <p className="font-semibold">{product.stock} unidades</p>
            </div>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardContent className="flex h-full items-center gap-3 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <DollarSign className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Precio</p>
              <p className="font-semibold">${product.price.toLocaleString("es-CL")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Alias */}
        {productAliases.length > 0 && (
          <Card className="gap-2 py-3">
            <CardHeader className="pb-1 pt-0">
              <div className="flex items-center gap-2">
                <RefreshCw className="size-4 shrink-0 text-muted-foreground" />
                <h2 className="text-base font-semibold">Nombres alternativos (alias)</h2>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                {productAliases.map((a) => (
                  <Badge key={a.alias} variant="secondary" className="px-2.5 py-1">
                    {a.alias}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Vehículos compatibles */}
        {product.compatibleVehicles.length > 0 && (
          <Card className="gap-2 py-3">
            <CardHeader className="pb-1 pt-0">
              <div className="flex items-center gap-2">
                <Car className="size-4 shrink-0 text-muted-foreground" />
                <h2 className="text-base font-semibold">Vehículos compatibles</h2>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {product.compatibleVehicles.map((v) => (
                  <li key={v} className="flex items-center gap-2 before:content-['•'] before:font-bold before:text-primary">
                    {v}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Reemplazos */}
      {productReplacements.length > 0 && (
        <Card className="gap-2 py-3">
          <CardHeader className="pb-1 pt-0">
            <div className="flex items-center gap-2">
              <RefreshCw className="size-4 shrink-0 text-muted-foreground" />
              <h2 className="text-base font-semibold">Reemplazos y compatibles</h2>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-4">
              {productReplacements.map((r) => {
                const replacementProduct = products.find(
                  (p) => p.id === r.replacementId
                );
                if (!replacementProduct) return null;
                return (
                  <li
                    key={r.replacementId}
                    className="flex flex-wrap items-start gap-2 rounded-lg border bg-muted/30 p-3 sm:items-center"
                  >
                    <Link
                      href={`/productos/${r.replacementId}`}
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {replacementProduct.name}
                    </Link>
                    <Badge variant={r.type === "exact" ? "default" : "secondary"}>
                      {r.type === "exact" ? "Exacto" : "Compatible"}
                    </Badge>
                    {r.notes && (
                      <span className="w-full text-sm text-muted-foreground sm:w-auto">
                        — {r.notes}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
