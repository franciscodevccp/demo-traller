"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Product, ProductAlias, Replacement } from "@/lib/types";
import { getInitialData, saveData } from "./initialData";

type ProductsContextValue = {
  products: Product[];
  aliases: ProductAlias[];
  replacements: Replacement[];
  addProduct: (product: Omit<Product, "id">) => Product;
  updateProduct: (id: string, data: Partial<Omit<Product, "id">>) => void;
  deleteProduct: (id: string) => void;
  addAlias: (productId: string, alias: string) => void;
  removeAlias: (productId: string, alias: string) => void;
  addReplacement: (r: Omit<Replacement, "productId"> & { productId: string }) => void;
  removeReplacement: (productId: string, replacementId: string) => void;
  getProductById: (id: string) => Product | undefined;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

function generateId(): string {
  return "prod-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
}

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<{ products: Product[]; aliases: ProductAlias[]; replacements: Replacement[] }>(() => getInitialData());

  const persist = useCallback((next: { products: Product[]; aliases: ProductAlias[]; replacements: Replacement[] }) => {
    setData(next);
    saveData(next);
  }, []);

  const addProduct = useCallback(
    (input: Omit<Product, "id">): Product => {
      const id = generateId();
      const product: Product = { ...input, id };
      const next = {
        ...data,
        products: [...data.products, product],
      };
      persist(next);
      return product;
    },
    [data, persist]
  );

  const updateProduct = useCallback(
    (id: string, input: Partial<Omit<Product, "id">>) => {
      const next = {
        ...data,
        products: data.products.map((p) => (p.id === id ? { ...p, ...input } : p)),
      };
      persist(next);
    },
    [data, persist]
  );

  const deleteProduct = useCallback(
    (id: string) => {
      const next = {
        products: data.products.filter((p) => p.id !== id),
        aliases: data.aliases.filter((a) => a.productId !== id),
        replacements: data.replacements.filter((r) => r.productId !== id && r.replacementId !== id),
      };
      persist(next);
    },
    [data, persist]
  );

  const addAlias = useCallback(
    (productId: string, alias: string) => {
      if (!alias.trim()) return;
      const next = {
        ...data,
        aliases: [...data.aliases, { productId, alias: alias.trim() }],
      };
      persist(next);
    },
    [data, persist]
  );

  const removeAlias = useCallback(
    (productId: string, alias: string) => {
      const next = {
        ...data,
        aliases: data.aliases.filter((a) => !(a.productId === productId && a.alias === alias)),
      };
      persist(next);
    },
    [data, persist]
  );

  const addReplacement = useCallback(
    (r: Replacement) => {
      const next = {
        ...data,
        replacements: [...data.replacements, r],
      };
      persist(next);
    },
    [data, persist]
  );

  const removeReplacement = useCallback(
    (productId: string, replacementId: string) => {
      const next = {
        ...data,
        replacements: data.replacements.filter(
          (r) => !(r.productId === productId && r.replacementId === replacementId)
        ),
      };
      persist(next);
    },
    [data, persist]
  );

  const getProductById = useCallback(
    (id: string) => data.products.find((p) => p.id === id),
    [data.products]
  );

  const value = useMemo(
    () => ({
      products: data.products,
      aliases: data.aliases,
      replacements: data.replacements,
      addProduct,
      updateProduct,
      deleteProduct,
      addAlias,
      removeAlias,
      addReplacement,
      removeReplacement,
      getProductById,
    }),
    [
      data.products,
      data.aliases,
      data.replacements,
      addProduct,
      updateProduct,
      deleteProduct,
      addAlias,
      removeAlias,
      addReplacement,
      removeReplacement,
      getProductById,
    ]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}
