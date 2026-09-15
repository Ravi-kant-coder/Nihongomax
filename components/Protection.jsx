"use client";

import { useEffect } from "react";

export default function Protection() {
  useEffect(() => {
    const preventContextMenu = (event) => {
      event.preventDefault();
    };

    const preventDragStart = (event) => {
      if (event.target.tagName === "IMG") {
        event.preventDefault();
      }
    };

    const preventImageMouseDown = (event) => {
      if (event.target.tagName === "IMG") {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("dragstart", preventDragStart);
    document.addEventListener("mousedown", preventImageMouseDown);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("dragstart", preventDragStart);
      document.removeEventListener("mousedown", preventImageMouseDown);
    };
  }, []);

  return null;
}
