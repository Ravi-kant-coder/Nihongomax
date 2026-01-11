"use client";
import { useEffect, useState } from "react";

export default function Warning({ warning }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (warning) {
      setVisible(true);

      // hide after 5s
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [warning]);

  if (!warning) return null;

  return (
    <div className="fixed inset-0 z-500 flex items-start justify-center mt-50">
      <div
        className={`text-white px-4 py-2 rounded-lg shadow-md transition-all
         duration-500
          ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
          }`}
      >
        {warning.message}
      </div>
    </div>
  );
}
