"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProductFormData = {
  code: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  price: string;
  stock: string;
  compatibleVehicles: string;
};

function toFormData(p: Product | null): ProductFormData {
  if (!p)
    return {
      code: "",
      name: "",
      description: "",
      brand: "",
      category: "",
      price: "",
      stock: "0",
      compatibleVehicles: "",
    };
  return {
    code: p.code,
    name: p.name,
    description: p.description,
    brand: p.brand,
    category: p.category,
    price: String(p.price),
    stock: String(p.stock),
    compatibleVehicles: p.compatibleVehicles.join("\n"),
  };
}

type Props = {
  product?: Product | null;
  onSubmit: (data: Omit<Product, "id">) => void;
  onCancel: () => void;
  submitLabel?: string;
  /** En true, no usa Card (para usar dentro de un modal) */
  embedded?: boolean;
};

export function ProductForm({ product, onSubmit, onCancel, submitLabel = "Guardar", embedded = false }: Props) {
  const [form, setForm] = useState<ProductFormData>(() => toFormData(product ?? null));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseInt(form.price, 10) || 0;
    const stock = parseInt(form.stock, 10) || 0;
    const compatibleVehicles = form.compatibleVehicles
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    onSubmit({
      code: form.code.trim(),
      name: form.name.trim(),
      description: form.description.trim(),
      brand: form.brand.trim(),
      category: form.category.trim(),
      price,
      stock,
      compatibleVehicles,
    });
  };

  const fieldSpacing = embedded ? "space-y-3" : "space-y-2";
  const sectionGap = embedded ? "gap-5" : "gap-4";
  const formContent = (
    <>
          <div className={`grid ${sectionGap} sm:grid-cols-2`}>
            <div className={fieldSpacing}>
              <label htmlFor="code" className="text-sm font-medium">
                Código
              </label>
              <Input
                id="code"
                value={form.code}
                onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                placeholder="ROT-001"
                required
              />
            </div>
            <div className={fieldSpacing}>
              <label htmlFor="name" className="text-sm font-medium">
                Nombre
              </label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Rótula de Dirección Derecha"
                required
              />
            </div>
          </div>

          <div className={fieldSpacing}>
            <label htmlFor="description" className="text-sm font-medium">
              Descripción
            </label>
            <textarea
              id="description"
              className="flex min-h-[100px] w-full rounded-lg border border-input bg-background px-3 py-3 text-sm leading-relaxed ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Descripción detallada del repuesto..."
            />
          </div>

          <div className={`grid ${sectionGap} sm:grid-cols-2`}>
            <div className={fieldSpacing}>
              <label htmlFor="brand" className="text-sm font-medium">
                Marca
              </label>
              <Input
                id="brand"
                value={form.brand}
                onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
                placeholder="Monroe"
              />
            </div>
            <div className={fieldSpacing}>
              <label htmlFor="category" className="text-sm font-medium">
                Categoría
              </label>
              <Input
                id="category"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                placeholder="Suspensión y Dirección"
              />
            </div>
          </div>

          <div className={`grid ${sectionGap} sm:grid-cols-2`}>
            <div className={fieldSpacing}>
              <label htmlFor="price" className="text-sm font-medium">
                Precio
              </label>
              <Input
                id="price"
                type="number"
                min={0}
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                placeholder="25990"
              />
            </div>
            <div className={fieldSpacing}>
              <label htmlFor="stock" className="text-sm font-medium">
                Stock
              </label>
              <Input
                id="stock"
                type="number"
                min={0}
                value={form.stock}
                onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                placeholder="12"
              />
            </div>
          </div>

          <div className={fieldSpacing}>
            <label htmlFor="vehicles" className="text-sm font-medium">
              Vehículos compatibles (uno por línea)
            </label>
            <textarea
              id="vehicles"
              className="flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-3 text-sm leading-relaxed ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={form.compatibleVehicles}
              onChange={(e) => setForm((f) => ({ ...f, compatibleVehicles: e.target.value }))}
              placeholder="Toyota Corolla 2014-2019&#10;Toyota Yaris 2015-2020"
            />
          </div>

          <div className={`flex flex-col gap-2 pt-4 sm:flex-row sm:gap-2 ${embedded ? "pt-6" : ""}`}>
      <Button type="submit" className="min-h-11 sm:min-h-9">{submitLabel}</Button>
      <Button type="button" variant="outline" onClick={onCancel} className="min-h-11 sm:min-h-9">
        Cancelar
      </Button>
    </div>
    </>
  );

  if (embedded) {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        {formContent}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-0 shadow-none sm:border sm:shadow-sm">
        <CardHeader className="px-0 pt-0 sm:px-6 sm:pt-6">
          <CardTitle className="text-lg sm:text-xl">{product ? "Editar producto" : "Nuevo producto"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-0 sm:px-6 sm:pb-6">
          {formContent}
        </CardContent>
      </Card>
    </form>
  );
}
