import Link from "next/link";
import Image from "next/image";
const CoursesBar = () => {
  return (
    <div className="fixed p-2">
      <div className=" relative text-lg text-black font-semibold p-2 rounded-xl bg-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_4px_10px_rgba(0,0,0,0.2)] border border-gray-300 hover:scale-105 transition-all duration-300 flex justify-between items-center">
        <Link target="_blank" href={"/friends-list"}>
          <Image
            src={"/transp.png"}
            alt="N5"
            width={100}
            height={80}
            className="w-20 h-20 rounded-md hover:scale-110 duration-200 transform"
          />
        </Link>
      </div>
    </div>
  );
};

export default CoursesBar;
