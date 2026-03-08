import Fuse from "fuse.js";
import type { Product, ProductAlias } from "@/lib/types";

type ProductWithAliases = Product & { aliases: string[] };

function buildSearchIndex(
  products: Product[],
  aliases: ProductAlias[]
): ProductWithAliases[] {
  return products.map((product) => ({
    ...product,
    aliases: aliases
      .filter((a) => a.productId === product.id)
      .map((a) => a.alias),
  }));
}

export function createSearch(products: Product[], aliases: ProductAlias[]) {
  const searchIndex = buildSearchIndex(products, aliases);
  const fuse = new Fuse(searchIndex, {
    keys: [
      { name: "name", weight: 1.0 },
      { name: "aliases", weight: 0.9 },
      { name: "code", weight: 0.8 },
      { name: "description", weight: 0.5 },
      { name: "brand", weight: 0.4 },
    ],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
  });
  return (query: string): Product[] => {
    if (!query.trim()) return [];
    return fuse.search(query).map((result) => result.item);
  };
}
