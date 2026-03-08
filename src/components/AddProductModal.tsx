"use client";

import { useProducts } from "@/store/ProductsContext";
import { ProductForm } from "@/components/ProductForm";
import { useVisualViewportHeight } from "@/hooks/useVisualViewportHeight";
import { useIsMobile } from "@/hooks/use-mobile";
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

const GAP = 24;

export function AddProductModal({ open, onOpenChange }: Props) {
  const { addProduct } = useProducts();
  const isMobile = useIsMobile();
  const { height: viewportHeight, offsetTop } = useVisualViewportHeight(open);

  const contentStyle = open
    ? isMobile
      ? {
          top: `${offsetTop + 8}px`,
          transform: "translateX(-50%)",
          maxHeight: `min(${viewportHeight - GAP}px, 52vh)`,
          height: `min(${viewportHeight - GAP}px, 52vh)`,
        }
      : {
          maxHeight: `min(${viewportHeight - GAP}px, 90vh)`,
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
