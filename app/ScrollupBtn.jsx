import { ArrowUp } from "lucide-react";

const ScrollupBtn = () => {
  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="hidden md:block md:fixed bottom-4 right-4 bg-gray-600 hover:bg-gray-800
       text-white font-bold py-2 px-4 rounded shadow cursor-pointer dark:hover:bg-gray-500"
    >
      <ArrowUp />
    </button>
  );
};

export default ScrollupBtn;
