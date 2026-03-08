"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useProducts } from "@/store/ProductsContext";
import { ProductForm } from "@/components/ProductForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditarProductoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { getProductById, updateProduct } = useProducts();
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

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6 lg:gap-8 lg:p-8">
      <Button variant="ghost" size="sm" asChild>
        <Link href={`/productos/${id}`} className="gap-2">
          <ArrowLeft className="size-4" />
          Volver al producto
        </Link>
      </Button>

      <ProductForm
        product={product}
        submitLabel="Guardar cambios"
        onSubmit={(data) => {
          updateProduct(id, data);
          router.push(`/productos/${id}`);
        }}
        onCancel={() => router.push(`/productos/${id}`)}
      />
    </div>
  );
}
