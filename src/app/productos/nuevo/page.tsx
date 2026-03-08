"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useProducts } from "@/store/ProductsContext";
import { ProductForm } from "@/components/ProductForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NuevoProductoPage() {
  const router = useRouter();
  const { addProduct } = useProducts();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6 lg:gap-8 lg:p-8">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/productos" className="gap-2">
          <ArrowLeft className="size-4" />
          Volver a productos
        </Link>
      </Button>

      <ProductForm
        product={null}
        submitLabel="Agregar producto"
        onSubmit={(data) => {
          const product = addProduct(data);
          router.push(`/productos/${product.id}`);
        }}
        onCancel={() => router.push("/productos")}
      />
    </div>
  );
}
