import Link from "next/link";
import Image from "next/image";
const CoursesBar = () => {
  return (
    <>
      <div className="mt-20 relative text-lg text-black font-semibold p-2 rounded-xl bg-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_4px_10px_rgba(0,0,0,0.2)] border border-gray-300 hover:scale-105 transition-all duration-300">
        <div className="flex justify-between items-center">
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
      <button
        className=" mt-20 relative text-[10px] text-gray-700 font-semibold px-6 py-2 rounded-full 
    bg-gradient-to-br from-white via-gray-100 to-gray-300 
    border border-white/60 
    shadow-[inset_0_8px_12px_rgba(255,255,255,0.9),inset_0_-8px_10px_rgba(0,0,0,0.05),0_12px_25px_rgba(0,0,0,0.1)] 
    ring-1 ring-black/20 
    backdrop-blur-md 
    hover:scale-105 transition-all duration-300 overflow-hidden"
      >
        <Link target="_blank" href={"/friends-list"}>
          <Image
            src={"/transp.png"}
            alt="N5"
            width={100}
            height={80}
            className="w-20 h-20 rounded-md hover:scale-110 duration-200 transform"
          />
        </Link>
        {/* Top left intense shine */}
        <span className="absolute top-1 left-2 w-6 h-3 bg-white/90 rounded-full blur-[1px] opacity-90 pointer-events-none"></span>
        {/* Small highlight dots (like double reflection) */}
        <span className="absolute top-2 right-2 w-2 h-1.5 bg-white/70 rounded-full blur-sm opacity-70 pointer-events-none"></span>
        <span className="absolute top-3 right-4 w-1.5 h-1 bg-white/50 rounded-full blur-[1px] opacity-60 pointer-events-none"></span>
        {/* Ground shadow */}
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-14 h-2.5 bg-black/10 rounded-full blur-md opacity-40 pointer-events-none"></span>
      </button>
    </>
  );
};

export default CoursesBar;
