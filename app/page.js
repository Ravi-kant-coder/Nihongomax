import Wall from "@/components/Wall";
import CoursesBar from "@/components/CoursesBar";
import LeftSideBar from "@/components/LeftSideBar";

const Home = () => {
  return (
    <div>
      <main className="flex justify-between mt-20 px-4 bg-gray-300 dark:bg-[rgb(35,35,35)]">
        <div className="fixed mt-10 w-1/5 ">
          <LeftSideBar />
        </div>
        <div className="w-full max-w-1/2 mx-auto px-4">
          <Wall />
        </div>
        <div className="fixed right-3 w-1/5 bg-amber-300">
          <CoursesBar className="" />
        </div>
      </main>
    </div>
  );
};
export default Home;
