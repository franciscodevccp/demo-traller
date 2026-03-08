import type { Product, ProductAlias, Replacement } from "@/lib/types";
import { products as initialProducts } from "@/data/products";
import { aliases as initialAliases } from "@/data/aliases";
import { replacements as initialReplacements } from "@/data/replacements";

const STORAGE_KEY = "repuestos-app-data";

export interface StoredData {
  products: Product[];
  aliases: ProductAlias[];
  replacements: Replacement[];
}

export function getInitialData(): StoredData {
  if (typeof window === "undefined") {
    return {
      products: initialProducts,
      aliases: initialAliases,
      replacements: initialReplacements,
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StoredData;
      if (Array.isArray(parsed.products) && Array.isArray(parsed.aliases) && Array.isArray(parsed.replacements)) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return {
    products: initialProducts,
    aliases: initialAliases,
    replacements: initialReplacements,
  };
}

export function saveData(data: StoredData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}
