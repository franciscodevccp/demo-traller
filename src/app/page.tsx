"use client";

import { useProducts } from "@/store/ProductsContext";
import Link from "next/link";
import {
  Package,
  Search,
  AlertTriangle,
  LayoutGrid,
  DollarSign,
  Tags,
  ChevronRight,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const LOW_STOCK_THRESHOLD = 10;

export default function DashboardPage() {
  const { products } = useProducts();
  const total = products.length;
  const lowStockList = products.filter((p) => p.stock < LOW_STOCK_THRESHOLD);
  const lowStockCount = lowStockList.length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const categories = [...new Set(products.map((p) => p.category))].length;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Resumen de tu inventario de repuestos
        </p>
      </header>

      {/* Métricas: misma altura y alineación */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex h-full overflow-hidden border border-border/80 bg-card shadow-sm transition-shadow hover:shadow">
          <CardContent className="flex h-full items-center gap-4 p-5 lg:p-6">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Package className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Total productos
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums tracking-tight lg:text-3xl">
                {total}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex h-full overflow-hidden border border-border/80 bg-card shadow-sm transition-shadow hover:shadow">
          <CardContent className="flex h-full items-center gap-4 p-5 lg:p-6">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Stock bajo (&lt;{LOW_STOCK_THRESHOLD})
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums tracking-tight lg:text-3xl">
                {lowStockCount}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex h-full overflow-hidden border border-border/80 bg-card shadow-sm transition-shadow hover:shadow lg:min-w-0">
          <CardContent className="flex h-full items-center gap-4 p-5 lg:gap-5 lg:px-6 lg:py-6">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Valor en stock
              </p>
              <p className="mt-1 break-all text-lg font-bold tabular-nums tracking-tight lg:text-xl">
                ${totalValue.toLocaleString("es-CL")}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex h-full overflow-hidden border border-border/80 bg-card shadow-sm transition-shadow hover:shadow">
          <CardContent className="flex h-full items-center gap-4 p-5 lg:p-6">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <Tags className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Categorías
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums tracking-tight lg:text-3xl">
                {categories}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Secciones: stock bajo + acciones rápidas */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Productos con stock bajo */}
        <Card className="flex flex-col overflow-hidden border border-border/80 bg-card shadow-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-border/60 px-5 py-4 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-amber-500/10">
                <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-sm font-semibold tracking-tight">
                Productos con stock bajo
              </h2>
            </div>
            {lowStockCount > 0 && (
              <Button variant="ghost" size="sm" asChild className="h-8 gap-1 text-muted-foreground hover:text-foreground">
                <Link href="/inventario">
                  Ver todos
                  <ChevronRight className="size-3.5" />
                </Link>
              </Button>
            )}
          </CardHeader>
          <CardContent className="flex-1 px-5 py-4">
            {lowStockCount === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/80 bg-muted/20 py-10 text-center">
                <p className="text-sm text-muted-foreground">
                  No hay productos con stock bajo
                </p>
              </div>
            ) : (
              <ul className="space-y-2">
                {lowStockList.slice(0, 5).map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/productos/${p.id}`}
                      className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/20 px-3 py-2.5 text-sm transition-colors hover:border-border hover:bg-muted/40"
                    >
                      <div className="min-w-0 flex-1">
                        <span className="font-medium text-foreground">{p.name}</span>
                        <span className="ml-1.5 text-muted-foreground">· {p.code}</span>
                      </div>
                      <span className="shrink-0 rounded-md bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                        {p.stock} ud.
                      </span>
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground/70" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Acciones rápidas */}
        <Card className="flex flex-col overflow-hidden border border-border/80 bg-card shadow-sm">
          <CardHeader className="space-y-0 border-b border-border/60 px-5 py-4 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="size-4 text-primary" />
              </div>
              <h2 className="text-sm font-semibold tracking-tight">
                Acciones rápidas
              </h2>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 px-5 py-4">
            <Button asChild className="h-10 justify-start gap-2.5 rounded-lg">
              <Link href="/buscar">
                <Search className="size-4 opacity-90" />
                Ir a búsqueda
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-10 justify-start gap-2.5 rounded-lg">
              <Link href="/inventario">
                <LayoutGrid className="size-4 opacity-80" />
                Ver inventario
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-10 justify-start gap-2.5 rounded-lg">
              <Link href="/productos">
                <Package className="size-4 opacity-80" />
                Ver listado de productos
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
