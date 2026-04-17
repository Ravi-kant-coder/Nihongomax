"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useBannerStore from "@/store/useBannerStore";

export default function Banner() {
  const banner = useBannerStore((state) => state.banner);
  const clearBanner = useBannerStore((state) => state.clearBanner);

  useEffect(() => {
    if (banner) {
      const timer = setTimeout(() => {
        clearBanner();
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [banner, clearBanner]);

  const color =
    banner?.type === "error"
      ? "bg-red-500"
      : banner?.type === "warning"
        ? "bg-yellow-600"
        : "bg-green-600";

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center pointer-events-none">
      <AnimatePresence>
        {banner && (
          <motion.div
            key="banner"
            initial={{ y: -100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -100, opacity: 0, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
            }}
            className={`${color} text-white px-20 py-4 rounded-lg shadow-md font-semibold`}
          >
            {banner.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
