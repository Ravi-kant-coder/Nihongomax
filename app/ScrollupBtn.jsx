import { ArrowUp } from "lucide-react";

const ScrollupBtn = () => {
  return (
    <button
      className="hidden md:block md:fixed bottom-4 right-4 bg-gray-700 hover:bg-gray-900 z-9999
       text-white font-bold py-2 px-4 rounded shadow cursor-pointer dark:hover:bg-gray-500"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <ArrowUp />
    </button>
  );
};

export default ScrollupBtn;
