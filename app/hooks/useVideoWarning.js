import { useState, useCallback } from "react";

export const useVideoWarning = () => {
  const [warning, setWarning] = useState(null);

  const showWarning = useCallback(
    (message, type = "success", duration = 3000) => {
      setWarning({ message, type });
      setTimeout(() => setWarning(null), duration);
    },
    []
  );

  return { warning, showWarning };
};
