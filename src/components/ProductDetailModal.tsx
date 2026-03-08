"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useProducts } from "@/store/ProductsContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  productId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Si se pasa, Editar abre este callback en lugar de ir a la página (ej. para abrir modal de edición) */
  onEditClick?: (productId: string) => void;
};

export function ProductDetailModal({ productId, open, onOpenChange, onEditClick }: Props) {
  const router = useRouter();
  const { products, aliases, replacements, getProductById, deleteProduct } = useProducts();
  const product = productId ? getProductById(productId) : null;

  const productAliases = product ? aliases.filter((a) => a.productId === product.id) : [];
  const productReplacements = product ? replacements.filter((r) => r.productId === product.id) : [];

  const handleDelete = () => {
    if (!productId) return;
    if (window.confirm("¿Eliminar este producto? Se borrarán también sus alias y reemplazos vinculados.")) {
      deleteProduct(productId);
      onOpenChange(false);
      router.refresh();
    }
  };

  const handleEdit = () => {
    if (productId) {
      if (onEditClick) {
        onEditClick(productId);
        onOpenChange(false);
      } else {
        router.push(`/productos/${productId}/editar`);
        onOpenChange(false);
      }
    }
  };

  useEffect(() => {
    if (open && productId && !product) onOpenChange(false);
  }, [open, productId, product, onOpenChange]);

  if (!product && open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[90vh] w-[calc(100%-2rem)] flex-col overflow-hidden p-0 sm:max-w-lg lg:max-w-2xl"
        showCloseButton={true}
      >
        <DialogHeader className="shrink-0 space-y-1 px-6 pt-6 pb-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{product?.code}</p>
          <DialogTitle className="text-left text-xl font-bold leading-snug break-words pr-10 sm:text-2xl">
            {product?.name}
          </DialogTitle>
        </DialogHeader>

        {product && (
          <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6">
            <div className="space-y-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-2">
                <Badge className="px-2.5 py-0.5">{product.brand}</Badge>
                <Badge variant="outline" className="px-2.5 py-0.5">{product.category}</Badge>
                <Badge variant="secondary" className="px-2.5 py-0.5">Stock: {product.stock}</Badge>
                <Badge variant="secondary" className="px-2.5 py-0.5">${product.price.toLocaleString("es-CL")}</Badge>
              </div>

              {productAliases.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">Nombres alternativos (alias)</h3>
                  <div className="flex flex-wrap gap-2">
                    {productAliases.map((a) => (
                      <Badge key={a.alias} variant="outline" className="px-2.5 py-0.5">
                        {a.alias}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {product.compatibleVehicles.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">Vehículos compatibles</h3>
                  <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-muted-foreground">
                    {product.compatibleVehicles.map((v) => (
                      <li key={v}>{v}</li>
                    ))}
                  </ul>
                </div>
              )}

              {productReplacements.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">Reemplazos y compatibles</h3>
                  <ul className="space-y-3">
                    {productReplacements.map((r) => {
                      const replacementProduct = products.find((p) => p.id === r.replacementId);
                      if (!replacementProduct) return null;
                      return (
                        <li key={r.replacementId} className="flex flex-wrap items-baseline gap-2 text-sm">
                          <button
                            type="button"
                            onClick={() => {
                              onOpenChange(false);
                              router.push(`/productos/${r.replacementId}`);
                            }}
                            className="font-medium text-primary underline-offset-4 hover:underline text-left"
                          >
                            {replacementProduct.name}
                          </button>
                          <Badge variant={r.type === "exact" ? "default" : "secondary"} className="text-xs">
                            {r.type === "exact" ? "Exacto" : "Compatible"}
                          </Badge>
                          {r.notes && (
                            <span className="w-full text-muted-foreground sm:w-auto">— {r.notes}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        <DialogFooter className="mx-0 mb-0 shrink-0 gap-2 rounded-b-xl border-t bg-muted/30 px-6 py-4 sm:gap-3">
          <Button variant="outline" size="sm" asChild className="min-h-9">
            <Link href={productId ? `/productos/${productId}` : "/productos"} onClick={() => onOpenChange(false)}>
              Ver página completa
            </Link>
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={handleEdit} className="min-h-9 gap-2">
            <Pencil className="size-4 shrink-0" />
            Editar
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete} className="min-h-9 gap-2">
            <Trash2 className="size-4 shrink-0" />
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
