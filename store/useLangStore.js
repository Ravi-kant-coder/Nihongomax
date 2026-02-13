import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLangStore = create(
  persist(
    (set) => ({
      lang: "en",

      setLang: (newLang) => set({ lang: newLang }),

      toggleLang: () =>
        set((state) => ({
          lang: state.lang === "en" ? "ja" : "en",
        })),
    }),
    {
      name: "nihongomax-language", // localStorage key
    },
  ),
);
