"use client";
import { Home } from "lucide-react";
import Spinner from "./Spinner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleNavigation = (path) => {
    startTransition(() => {
      router.push(path);
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center text-gray-800 dark:text-gray-200 p-4">
        <h1 className="text-6xl font-bold mb-4">Oopss.....</h1>
        <br />
        <br />

        <h2 className="text-2xl font-semibold mb-2">Page not found</h2>
        <p className="text-black dark:text-gray-300 text-center ">
          <br />
          <br />
          ページが見つかりませんでした。
        </p>
        <br />
        <br />
        <button
          className="mt-4 cursor-pointer text-white px-4 py-2 rounded bg-[rgb(50,50,50)] 
           hover:bg-black dark:bg-teal-950 dark:hover:bg-teal-900
          flex justify-center transition-colors duration-100 items-center"
          onClick={() => handleNavigation("/")}
        >
          Go to Home <Home className="ml-2" size={20} />
        </button>
      </div>
      {isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 dark:bg-black/60 backdrop-blur-xs z-9999">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default NotFound;
