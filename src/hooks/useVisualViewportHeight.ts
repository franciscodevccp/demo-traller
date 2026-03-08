"use client";

import { useState, useEffect } from "react";

/**
 * Devuelve datos del visual viewport para que los modales se adapten al teclado virtual en móvil.
 */
export function useVisualViewportHeight(enabled: boolean) {
  const [height, setHeight] = useState(400);
  const [offsetTop, setOffsetTop] = useState(0);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const vv = window.visualViewport;
    const update = () => {
      if (vv) {
        setHeight(vv.height);
        setOffsetTop(vv.offsetTop);
      } else {
        setHeight(window.innerHeight);
        setOffsetTop(0);
      }
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

  return { height, offsetTop };
}
