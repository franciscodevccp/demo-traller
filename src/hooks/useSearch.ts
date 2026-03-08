"use client";

import { useState, useMemo, useCallback } from "react";
import { createSearch } from "@/lib/search";
import type { Product, ProductAlias } from "@/lib/types";

export function useSearch(
  products: Product[],
  aliases: ProductAlias[],
  initialQuery = ""
) {
  const [query, setQuery] = useState(initialQuery);
  const searchFn = useMemo(() => createSearch(products, aliases), [products, aliases]);
  const results = useMemo(() => searchFn(query), [searchFn, query]);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
  }, []);

  return { query, setQuery: handleSearch, results, clearSearch };
}
