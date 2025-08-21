import { useState, useCallback } from "react";

export const useBanner = () => {
  const [banner, setBanner] = useState(null);

  const showBanner = useCallback(
    (message, type = "success", duration = 3000) => {
      setBanner({ message, type });
      setTimeout(() => setBanner(null), duration);
    },
    []
  );

  return { banner, showBanner };
};
