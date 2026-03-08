"use client";

import { useProducts } from "@/store/ProductsContext";
import { ProductForm } from "@/components/ProductForm";
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

export function AddProductModal({ open, onOpenChange }: Props) {
  const { addProduct } = useProducts();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[90vh] w-[calc(100%-2rem)] flex-col overflow-hidden p-0 sm:max-w-lg lg:max-w-2xl max-md:top-4 max-md:max-h-[50vh] max-md:translate-y-0"
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
