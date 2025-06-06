import Wall from "@/components/Wall";
import CoursesBar from "@/components/CoursesBar";
import LeftSideBar from "@/components/LeftSideBar";

const Home = () => {
  return (
    <>
      <main className="flex pt-2 justify-between md:px-2 lg:px-4 pl-1 bg-gray-300 dark:bg-black">
        <div className="fixed mt-10 w-1/5 ">
          <LeftSideBar />
        </div>
        <div className="w-full lg:max-w-1/2 md:max-w-1/2 lg:mt-18 md:mt-18 mt-12 mx-auto">
          <Wall />
        </div>
        <div className="fixed hidden lg:flex right-3 w-1/5">
          <CoursesBar className="" />
        </div>
      </main>
    </>
  );
};
export default Home;
