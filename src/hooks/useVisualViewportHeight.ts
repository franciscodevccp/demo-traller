"use client";

import { useState, useEffect } from "react";

/**
 * Devuelve la altura del visual viewport (se reduce cuando el teclado virtual está abierto en móvil).
 * Permite que los modales limiten su altura y el scroll funcione correctamente con el teclado abierto.
 */
export function useVisualViewportHeight(enabled: boolean) {
  const [height, setHeight] = useState(600);
  const [innerHeight, setInnerHeight] = useState(600);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const vv = window.visualViewport;
    const update = () => {
      setInnerHeight(window.innerHeight);
      setHeight(vv?.height ?? window.innerHeight);
    };

    update();
    if (vv) {
      vv.addEventListener("resize", update);
      vv.addEventListener("scroll", update);
    }
    window.addEventListener("resize", update);

    return () => {
      if (vv) {
        vv.removeEventListener("resize", update);
        vv.removeEventListener("scroll", update);
      }
      window.removeEventListener("resize", update);
    };
  }, [enabled]);

  const positionAtTop = height > 0 && height < innerHeight * 0.85;
  return { height, positionAtTop };
}
