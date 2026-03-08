import type { Replacement } from "@/lib/types";

export const replacements: Replacement[] = [
  {
    productId: "prod-001",
    replacementId: "prod-002",
    type: "exact",
    notes: "Mismo modelo, marca diferente. TRW compatible con Monroe.",
  },
  {
    productId: "prod-002",
    replacementId: "prod-001",
    type: "exact",
    notes: "Reemplazo original Monroe.",
  },
];
