import Link from "next/link";
import Image from "next/image";
const CoursesBar = () => {
  return (
    <div
      className="md:flex flex-wrap gap-4 fixed md:top-20 h-full hidden md:right-20 lg:right-10 p-2 md:w-1/3
    overflow-y-auto scroll-smooth overscroll-contain"
    >
      {/* <div
        className=" relative text-lg text-black font-semibold p-2 rounded-xl 
      bg-white border border-gray-300 hover:scale-105 transition-all duration-300 
      flex justify-between items-center"
      >
        <Link target="_blank" href={"/friends-list"}>
          <Image
            src={"/transp.png"}
            alt="N5"
            width={80}
            height={60}
            className="rounded-md hover:scale-110 duration-200 transform"
          />
        </Link>
      </div> */}
    </div>
  );
};

export default CoursesBar;
