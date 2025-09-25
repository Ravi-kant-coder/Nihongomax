import CreateAcc from "./CreateAcc";
import Login from "./Login";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TryWithoutLogin from "./TryWithoutLogin";
const Page = () => {
  return (
    <div className="min-h-screen dark:bg-[rgb(200,200,200)]">
      {/* ---------------------------------NAVBAR----------------------------- */}

      <div className="z-10 w-full dark:bg-[rgb(70,70,70)] py-1">
        <div className="flex justify-start items-center ml-10">
          <Image
            src={"/nihonkai-Transp.png"}
            alt="Nihongomax"
            width={200}
            height={200}
            className="scale-110"
          />
          <Image
            src={"/nihongomax-transp.png"}
            alt="Nihongomax"
            width={300}
            height={200}
            className="ml-5"
          />
          <div className="fixed top-5 right-80 z-20">
            <CreateAcc />
          </div>
        </div>
        <Login />
      </div>

      {/* ---------------------------------CLOUDS----------------------------- */}

      <div className="w-full absolute">
        <div className="text-6xl animate-[cloud-left-right_15s_linear_infinite]">
          ☁️
        </div>
        <div className="text-5xl animate-[cloud-left-right_10s_linear_infinite]">
          ☁️
        </div>
      </div>
      <div className="flex">
        {/* --------------------------Learn Japanese And MountFuji--------------------- */}
        <div className="flex flex-col ">
          <div className="flex justify-start items-center">
            <Image
              src="/learnJapanese.jpeg"
              alt="trans"
              width={800}
              height={400}
              className="rounded"
            />
            <div className="relative">
              <Avatar className="w-70 h-70 rounded-sm">
                <AvatarImage src="/Mount-Fuji.png" className="object-cover" />
                <AvatarFallback
                  className="bg-gray-400 dark:bg-gray-500 w-30 h-20 lg:text-4xl
                          font-semibold rounded mr-2 text-2xl"
                >
                  Nihongomax
                </AvatarFallback>
              </Avatar>
              <Image
                src="/Branch.png"
                alt="trans"
                width={500}
                height={200}
                className="absolute left-30 top-30 branch-animate"
              />
            </div>
          </div>

          {/* ---------------------------Neela Gola and 5000---------------------- */}

          <div className="flex justify-center items-center">
            <div>
              <Avatar className="w-70 h-70 n5-animate">
                <AvatarImage src="/tsukimi2.png" className="object-cover" />
                <AvatarFallback
                  className="bg-gray-400 dark:bg-gray-500 w-30 h-20 lg:text-4xl
                          font-semibold rounded mr-2 text-2xl"
                >
                  Nihongomax
                </AvatarFallback>
              </Avatar>
              <div className="mb-10 n4-animate ">
                <CreateAcc />
              </div>
            </div>
            <Avatar className="w-175 h-110 rounded-2xl bg-white/90">
              <AvatarImage src="/learnJapNew.jpeg" className="object-cover" />
              <AvatarFallback
                className="bg-gray-400 dark:bg-gray-500 w-30 h-20 lg:text-4xl
                          font-semibold rounded mr-2 text-2xl"
              >
                Nihongomax
              </AvatarFallback>
            </Avatar>{" "}
            <div className=" dark:bg-[rgb(150,150,150)] bg-amber-200">
              <TryWithoutLogin />
            </div>
          </div>
          <Image
            src="/jobs-japan.png"
            alt="trans"
            width={500}
            height={200}
            className="w-[60%] rounded-2xl"
          />
        </div>
      </div>

      <Image
        src="/japan_theme_left.png"
        alt="trans"
        width={300}
        height={400}
        className="right-5 top-25 h-full rounded-2xl"
      />
    </div>
  );
};

export default Page;
