import { useLangStore } from "@/store/useLangStore";
import { dictionary } from "@/lib/i18n/dictionary";
import { formatRelativeTime } from "@/lib/utils";

export default function useFormatRelativeTime() {
  const lang = useLangStore((s) => s.lang);
  const dict = dictionary[lang];

  return (date) => formatRelativeTime(date, lang, dict);
}
