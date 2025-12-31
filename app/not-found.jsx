import Link from "next/link";
import LeftSideBar from "./LeftSideBar";

const NotFound = () => {
  return (
    <>
      <div className="p-2 mt-16">
        <LeftSideBar />
      </div>
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-6xl font-bold mb-4">Oopss.....</h1>
        <h2 className="text-2xl font-semibold mb-2">Page not found</h2>
        <p className="text-black dark:text-gray-300 text-center ">
          The page you are looking for does not exist.
          <br />
          ページが見つかりませんでした。
        </p>
      </div>
    </>
  );
};
export default NotFound;
