"use client";
import { X } from "lucide-react";
import useStudyStore from "@/store/useStudyStore";
import Link from "next/link";
import Image from "next/image";

const StudyBox = () => {
  const { isStudyBoxOpen, closeStudyBox } = useStudyStore();
  if (!isStudyBoxOpen) return null;

  return (
    <>
      {isStudyBoxOpen && (
        <div
          className={`fixed top-30 mx-5 z-900 bg-white dark:bg-[rgb(30,30,30)]
             dark:text-white rounded-md bottom-20 left-2 right-2 ${
               isStudyBoxOpen ? "visible" : "invisible"
             }`}
        >
          <div className="z-500 rounded ">
            <button
              onClick={closeStudyBox}
              className="dark:hover:bg-[rgb(20,20,20)] hover:bg-gray-400 hover:text-white dark:hover:text-white text-gray-500 dark:text-[rgb(150,150,150)] cursor-pointer border-2 border-gray-400 dark:border-[rgb(150,150,150)] rounded-full absolute top-2 right-2 z-50"
            >
              <X className="w-7 h-7" />
            </button>
            <div className="fixed flex flex-wrap gap-4">
              <div className="relative text-3xl text-gray-700 font-semibold p-2 rounded-xl bg-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_4px_10px_rgba(0,0,0,0.2)] border border-gray-300 hover:scale-102 transition-all duration-300 flex justify-between items-center">
                <Link target="_blank" href={"/friends"}>
                  <p className="w-90 h-10 rounded-md text-center duration-300">
                    About JLPT Study
                  </p>
                </Link>
              </div>
              <div className="n4-animate relative text-lg text-black font-semibold p-2 rounded-xl bg-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_4px_10px_rgba(0,0,0,0.2)] border border-gray-300 hover:scale-105 transition-all duration-300 flex justify-between items-center">
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
              <div className="n3-animate relative text-lg text-black font-semibold p-2 rounded-xl bg-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_4px_10px_rgba(0,0,0,0.2)] border border-gray-300 hover:scale-105 transition-all duration-300 flex justify-between items-center">
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
              <div className="n5-animate  relative text-lg text-black font-semibold p-2 rounded-xl bg-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_4px_10px_rgba(0,0,0,0.2)] border border-gray-300 hover:scale-105 transition-all duration-300 flex justify-between items-center">
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
              <div className=" relative text-lg text-black font-semibold p-2 rounded-xl bg-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_4px_10px_rgba(0,0,0,0.2)] border border-gray-300 hover:scale-105 transition-all duration-300 flex justify-between items-center">
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
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default StudyBox;
