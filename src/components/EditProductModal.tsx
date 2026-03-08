"use client";

import { useProducts } from "@/store/ProductsContext";
import { ProductForm } from "@/components/ProductForm";
import { useVisualViewportHeight } from "@/hooks/useVisualViewportHeight";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  productId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const GAP = 16;

export function EditProductModal({ productId, open, onOpenChange }: Props) {
  const { getProductById, updateProduct } = useProducts();
  const product = productId ? getProductById(productId) : null;
  const { height: viewportHeight, positionAtTop } = useVisualViewportHeight(open);

  const contentStyle = open
    ? {
        maxHeight: `min(${viewportHeight - GAP}px, 90vh)`,
        ...(positionAtTop && {
          top: "0.5rem",
          transform: "translateX(-50%)",
        }),
      }
    : undefined;

  if (!product && open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex w-[calc(100%-2rem)] flex-col overflow-hidden p-0 sm:max-w-lg lg:max-w-2xl"
        style={contentStyle}
        showCloseButton={true}
      >
        <DialogHeader className="shrink-0 border-b px-6 py-5">
          <DialogTitle className="text-left text-xl font-semibold">
            Editar producto
          </DialogTitle>
          {product && (
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {product.code}
            </p>
          )}
        </DialogHeader>

        {product && (
          <div className="modal-form-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-6 py-6">
            <ProductForm
              product={product}
              embedded
              submitLabel="Guardar cambios"
              onSubmit={(data) => {
                updateProduct(product.id, data);
                onOpenChange(false);
              }}
              onCancel={() => onOpenChange(false)}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
