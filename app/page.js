import Wall from "@/app/Wall";
import CoursesBar from "@/app/CoursesBar";
import LeftSideBar from "@/app/LeftSideBar";

const Home = () => {
  return (
    <>
      <main className="md:flex md:mt-5 dark:bg-black">
        <div className="md:mt-15 p-2 w-1/5 overflow-y-auto scroll-smooth overscroll-contain">
          <LeftSideBar />
        </div>
        <div className="md:max-w-1/2 md:mt-15 mt-25 overflow-y-auto md:h-150">
          <Wall />
        </div>
        <div className="md:mt-18 hidden md:flex">
          <CoursesBar className="" />
        </div>
      </main>
    </>
  );
};
export default Home;
