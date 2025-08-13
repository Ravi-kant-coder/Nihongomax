import CreateAcc from "./CreateAcc";
import HomeNav from "./HomeNav";
import Login from "./Login";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <div className="fixed z-10 w-full">
        <HomeNav />
      </div>
      <div className="w-[90vw] mx-auto overflow-hidden">
        <div
          className="top-10 left-[-100px] text-4xl 
        animate-[cloud-left-right_30s_linear_infinite]"
        >
          ☁️
        </div>
        <div
          className="top-20 left-[-200px] text-5xl 
        animate-[cloud-left-right_50s_linear_infinite]"
        >
          ☁️
        </div>
      </div>
      <div className="mb-10">
        <CreateAcc />
      </div>
      <div className="">
        <Login />
      </div>
      <Image
        src="/japan_theme_left.png"
        alt="trans"
        width={300}
        height={400}
        className="absolute left-5 top-5 h-full rounded-2xl"
      />
      <Image
        src="/japan_theme_left.png"
        alt="trans"
        width={300}
        height={400}
        className="absolute right-5 top-5 h-full rounded-2xl"
      />
    </>
  );
};

export default Page;
