import { useLangStore } from "@/store/useLangStore";
import { dictionary } from "@/lib/i18n/dictionary";

export default function useT() {
  const lang = useLangStore((state) => state.lang);

  return (key) => dictionary[lang][key] || key;
}
