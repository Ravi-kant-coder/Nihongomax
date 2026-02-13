import { useLangStore } from "@/store/useLangStore";
import useMounted from "./hooks/useMounted";

const LangToggleBtn = () => {
  const { lang, toggleLang } = useLangStore();
  const mounted = useMounted();
  if (!mounted) return null;
  return (
    <button
      onClick={toggleLang}
      className="border rounded p-1 border-gray-500 md:w-20 cursor-pointer"
    >
      <span className="font-[450] text-sm">
        {lang === "en" ? "日本語" : "English"}
      </span>
    </button>
  );
};

export default LangToggleBtn;
