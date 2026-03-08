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
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const GAP = 16;

export function AddProductModal({ open, onOpenChange }: Props) {
  const { addProduct } = useProducts();
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex w-[calc(100%-2rem)] flex-col overflow-hidden p-0 sm:max-w-lg lg:max-w-2xl"
        style={contentStyle}
        showCloseButton={true}
      >
        <DialogHeader className="shrink-0 border-b px-6 py-5">
          <DialogTitle className="text-left text-xl font-semibold">
            Agregar producto
          </DialogTitle>
        </DialogHeader>

        <div className="modal-form-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-6 py-6">
          <ProductForm
            product={null}
            embedded
            submitLabel="Agregar producto"
            onSubmit={(data) => {
              addProduct(data);
              onOpenChange(false);
            }}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
