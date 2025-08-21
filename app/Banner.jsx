"use client";
import { useEffect, useState } from "react";

export default function Banner({ banner }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (banner) {
      setVisible(true);

      // hide after 2.5s
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [banner]);

  if (!banner) return null;

  const color =
    banner.type === "error"
      ? "bg-red-600"
      : banner.type === "warning"
      ? "bg-yellow-600"
      : "bg-green-700";

  return (
    <div className="fixed inset-0 z-500 flex items-start justify-center mt-50">
      <div
        className={`${color} text-white px-4 py-2 rounded-lg shadow-md transition-all
         duration-500
          ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
          }`}
      >
        {banner.message}
      </div>
    </div>
  );
}
