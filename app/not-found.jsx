import Link from "next/link";

const NotFound = () => {
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
        <Link href={"/"}>
          <button
            className="mt-4 bg-gray-400 dark:bg-red-900 cursor-pointer text-white
          px-4 py-2 rounded hover:bg-gray-500 dark:hover:bg-red-700 transition"
          >
            Go to Home
          </button>
        </Link>
      </div>
    </>
  );
};
export default NotFound;
