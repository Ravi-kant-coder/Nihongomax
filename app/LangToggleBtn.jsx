import { useLangStore } from "@/store/useLangStore";
import useMounted from "./hooks/useMounted";

const LangToggleBtn = () => {
  const { lang, toggleLang } = useLangStore();
  const mounted = useMounted();
  if (!mounted) return null;
  return (
    <button
      onClick={toggleLang}
      className="border rounded-md px-1 md:p-1 border-gray-400 cursor-pointer w-25 md:w-30 hover:bg-white
      dark:border-gray-500 dark:hover:bg-[rgb(55,55,55)]"
    >
      <p className="text-xs">Change to</p>
      <p className="text-[13px] font-medium">
        {lang === "en" ? "日本語" : "English"}
      </p>
    </button>
  );
};

export default LangToggleBtn;
