"use client";
import { useEffect, useState } from "react";

export default function Banner({ banner }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (banner) {
      setVisible(true);

      // hide after 2s
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [banner]);

  if (!banner) return null;

  const color =
    banner.type === "error"
      ? "bg-red-600"
      : banner.type === "warning"
        ? "bg-yellow-600"
        : "bg-green-600";

  return (
    <div className="fixed z-500 flex items-center justify-center inset-0 pointer-events-none">
      <div
        className={`${color} text-white px-20 py-5 rounded-lg shadow-md transition-all
         duration-900
          ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
          }`}
      >
        {banner.message}
      </div>
    </div>
  );
}
