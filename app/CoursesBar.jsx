import Link from "next/link";
import Image from "next/image";
const CoursesBar = () => {
  return (
    <div className="fixed flex flex-wrap gap-4">
      <div
        className="relative text-3xl text-gray-700 font-semibold
       p-2 rounded-xl bg-white border border-gray-300 hover:scale-102
       transition-all duration-300 flex justify-between items-center"
      >
        <Link target="_blank" href={"/friends"}>
          <p className="w-90 h-10 rounded-md text-center duration-300">
            About JLPT Study
          </p>
        </Link>
      </div>
      <div
        className="n4-animate relative text-lg
       text-black font-semibold rounded-xl
        bg-whiteborder border-gray-300 hover:scale-105 transition-all duration-300 flex
          justify-between items-center"
      >
        <Link target="_blank" href={"/friends"}>
          <Image
            src={"/transp.png"}
            alt="N5"
            width={72}
            height={54}
            className="rounded-md hover:scale-110 duration-200 transform"
          />
        </Link>
      </div>
      <div
        className="n3-animate relative text-lg
       text-black font-semibold rounded-xl
        bg-whiteborder border-gray-300 hover:scale-105 transition-all duration-300 flex
          justify-between items-center"
      >
        <Link target="_blank" href={"/friends"}>
          <Image
            src={"/transp.png"}
            alt="N5"
            width={72}
            height={54}
            className="rounded-md hover:scale-110 duration-200 transform"
          />
        </Link>
      </div>
      <div
        className="n5-animate relative text-lg
       text-black font-semibold rounded-xl
        bg-whiteborder border-gray-300 hover:scale-105 transition-all duration-300 flex
          justify-between items-center"
      >
        <Link target="_blank" href={"/friends-list"}>
          <Image
            src={"/transp.png"}
            alt="N5"
            width={72}
            height={54}
            className="rounded-md hover:scale-110 duration-200 transform"
          />
        </Link>
      </div>
      <div
        className="n3-animate relative text-lg
       text-black font-semibold rounded-xl
        bg-whiteborder border-gray-300 hover:scale-105 transition-all duration-300 flex
          justify-between items-center"
      >
        <Link target="_blank" href={"/friends-list"}>
          <Image
            src={"/transp.png"}
            alt="N5"
            width={72}
            height={54}
            className="rounded-md hover:scale-110 duration-200 transform"
          />
        </Link>
      </div>
      <div className="">
        <Link target="_blank" href={"/friends-list"}>
          <Image
            src={"/transp.png"}
            alt="N5"
            width={72}
            height={54}
            className="n3-animate rounded-md hover:scale-110 duration-200 transform"
          />
        </Link>
      </div>
      <div
        className="relative text-3xl text-gray-700 font-semibold p-2 rounded-xl
       bg-white border border-gray-300 hover:scale-102 transition-all duration-300
        flex justify-between items-center"
      >
        <Link target="_blank" href={"/friends-list"}>
          <p className="w-90 h-10 rounded-md text-center duration-300">
            About JLPT Study
          </p>
        </Link>
      </div>
      <div
        className="n4-animate px-4 relative rounded-xl dark:bg-white/50 
        bg-white border shadow-2xl 
        border-gray-300 hover:scale-105 transition-all duration-300 flex items-center"
      >
        <Link target="_blank" href={"/friends-list"}>
          <Image
            src={"/transp.png"}
            alt="N5"
            width={60}
            height={40}
            className="rounded-md hover:scale-110 duration-200 transform"
          />
        </Link>
      </div>
      <div
        className="n3-animate relative text-lg text-black font-semibold
       p-2 rounded-xl bg-white border border-gray-300 hover:scale-105 transition-all 
       duration-300 flex justify-between items-center"
      >
        <Link target="_blank" href={"/friends"}>
          <Image
            src={"/transp.png"}
            alt="N5"
            width={80}
            height={60}
            className="rounded-md hover:scale-110 duration-200 transform"
          />
        </Link>
      </div>
      <div
        className="n5-animate  relative text-lg text-black font-semibold p-2 
      rounded-xl bg-white border border-gray-300 hover:scale-105 transition-all
       duration-300 flex justify-between items-center"
      >
        <Link target="_blank" href={"/friends"}>
          <Image
            src={"/transp.png"}
            alt="N5"
            width={80}
            height={60}
            className="rounded-md hover:scale-110 duration-200 transform"
          />
        </Link>
      </div>
      <div
        className=" relative text-lg text-black font-semibold p-2 rounded-xl
       bg-white border border-gray-300 hover:scale-105 transition-all 
       duration-300 flex justify-between items-center"
      >
        <Link target="_blank" href={"/friends"}>
          <Image
            src={"/transp.png"}
            alt="N5"
            width={80}
            height={60}
            className="rounded-md hover:scale-110 duration-200 transform"
          />
        </Link>
      </div>
      <div
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
      </div>
    </div>
  );
};

export default CoursesBar;
