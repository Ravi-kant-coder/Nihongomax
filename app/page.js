import Wall from "@/components/Wall";
import CoursesBar from "@/components/CoursesBar";
import LeftSideBar from "@/components/LeftSideBar";

const Home = () => {
  return (
    <>
      <main className="md:flex dark:bg-black">
        <div className="md:mt-15 p-2 w-1/5 overflow-y-auto scroll-smooth overscroll-contain">
          <LeftSideBar />
        </div>
        <div className="p-2 lg:max-w-1/2 md:max-w-1/2 md:mt-15 mt-25">
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
