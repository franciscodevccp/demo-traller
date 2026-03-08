export interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  compatibleVehicles: string[];
  imageUrl?: string;
}

export interface ProductAlias {
  productId: string;
  alias: string;
}

export interface Replacement {
  productId: string;
  replacementId: string;
  type: "exact" | "compatible";
  notes?: string;
}
