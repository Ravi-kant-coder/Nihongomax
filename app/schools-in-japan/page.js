"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LeftSideBar from "@/app/LeftSideBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SchoolTrigger from "./SchoolTrigger";
import {
  MapPin,
  Mail,
  ArrowBigDown,
  Phone,
  MonitorSmartphone as Mobile,
} from "lucide-react";
import AutoLoopVideo from "../AutoLoopVideo";

const SchoolsInJapan = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = today.toLocaleString("en-US", { month: "long" });
  const year = today.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="md:mt-20 mt-25 mb-20">
      <div className="md:mt-15 p-2 w-1/5 overflow-y-auto scroll-smooth overscroll-contain">
        <LeftSideBar />
      </div>

      <div className="mx-3 md:ml-60 mb-20 ">
        <h2
          className=" font-semibold text-gray-600 text-center md:text-4xl text-lg md:mt-4
        dark:text-gray-500"
        >
          1万人以上に貴校情報をご掲載ください。完全に無料です。
        </h2>
        <h2
          className="md:text-xl text-sm dark:text-gray-300 text-center dark:font-normal 
          md:mt-2 font-semibold"
        >
          Show your School to over 10,000 students looking to study in Japan.
        </h2>
        <div className="flex justify-center items-center mt-4">
          <SchoolTrigger />
        </div>
        <h2
          className="md:text-2xl font-semibold flex justify-center
        items-center dark:text-gray-400"
        >
          貴校募集情報は下記のようになります。
          <ArrowBigDown fill="black" size={40} className="mx-2 shrink-0" />
          (または、nihongomax@gmail.com まで、ご連絡)
        </h2>

        {/* --------------------------Sample School Post---------------------------- */}
        <div className="flex md:mx-20 md:my-8 flex-col mx-4 md:ml-30 mb-20 ">
          <div
            className="my-2 bg-white rounded-xl p-6 md:space-y-4 space-y-2 border
                 border-black dark:bg-black"
          >
            <div className="flex flex-col items-start justify-between">
              <div
                className="relative mx-auto my-auto overflow-hidden rounded flex
                     space-x-2 mb-2 flex-wrap"
              >
                <Avatar className="w-55 h-50 rounded">
                  <AvatarImage
                    src={"/japan-buildings.jpg"}
                    className="object-cover"
                  />
                </Avatar>
                <Avatar className="w-55 h-50 rounded">
                  <AvatarImage src={"/art.jpg"} className="object-cover" />
                </Avatar>
                <div className="w-55 h-50 rounded">
                  <AutoLoopVideo src={"/JapanVideo.mp4"} />
                </div>

                <Avatar className="w-55 h-50 rounded">
                  <AvatarImage
                    src={"/Himeji-Castle.jpg"}
                    className="object-cover"
                  />
                </Avatar>
              </div>
              <div>
                <p
                  className="font-semibold md:text-2xl text-xl text-gray-700
                     dark:text-gray-300"
                >
                  模擬日本語学校 Academy
                </p>
                <p
                  className="text-xs flex flex-col md:text-sm
                         text-gray-700 dark:text-gray-400"
                >
                  {formattedDate}
                </p>
              </div>
            </div>
            <p className="md:text-lg text-sm text-gray-800 dark:text-gray-200">
              模擬日本語学校 Academy
              は、2020年から日本全国での外国人向けの日本語教育を実践している学校です。
              模擬日本語学校 Academy is a reputed Japanese Language school in
              Japan that Provides excellent Japanese Language courses for
              Foreigner students since 2020.
              本校は、初心者から上級者まで幅広いレベルの学習者を対象とした日本語学校です。
              経験豊富な講師陣による丁寧な指導と、実践的なカリキュラムを提供しています。
              進学・就職を目指す方を全力でサポートいたします。
            </p>
            <div>
              <div className="mb-2">
                <p className="font-semibold flex items-center dark:font-normal md:text-md">
                  年間募集回数 - &nbsp;<span> 春、秋、冬、夏、年4回です。</span>
                </p>
              </div>
              <div className="dark:text-gray-400 md:space-y-3 space-y-1">
                <div className="flex items-center text-sm">
                  <MapPin size={18} strokeWidth={2} className="mr-2" />{" "}
                  <p className="font-semibold mr-2">住所 - &nbsp;</p>T -123,
                  Sample Building, Shinjuku, Tokyo, Japan
                </div>
                <div className="flex items-center text-sm">
                  <Mobile size={16} strokeWidth={2} className="mr-2" />
                  <p className="font-semibold mr-2">ホームページ - &nbsp;</p>
                  <a
                    href="https://learnjapanesedelhi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.japaneseschool.com
                  </a>
                </div>
                <div className="flex items-center text-sm">
                  <Mail size={16} strokeWidth={2} className="mr-2" />
                  <p className="font-semibold mr-2">メール - &nbsp;</p>
                  marumaru@email.com
                </div>
                <div className="flex items-center text-sm">
                  <Phone size={16} strokeWidth={2} className="mr-2" />
                  <p className="font-semibold mr-2">連絡先 - &nbsp;</p>
                  +81-99999999
                </div>
                <div>
                  <p>
                    本校では、日本語能力の向上だけでなく、日本社会で必要とされる実践力の習得を重視しています。
                    留学ビザの取得から進学・就職まで、総合的なサポートを行っています。入学をご希望の方は、
                    Nihongomaxの所定の申込書をご提出ください。入学経路は、オンライン面接または対面面接のいずれかを選択できます。
                    書類審査および面接後、合否結果をご連絡いたします。
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-start items-center">
              <div className="text-sm">
                <button
                  className="mt-4 bg-gray-400 dark:bg-red-900 cursor-pointer
                     dark:hover:bg-red-700 hover:bg-gray-700  hover:text-white
                      py-2 px-4 rounded font-semibold dark:font-normal"
                >
                  編集 Edit
                </button>
                <p className="dark:text-gray-500">このボタンはご本人のみ表示</p>
              </div>
              <div className="text-sm md:ml-10">
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-4  bg-red-400 dark:bg-red-900 cursor-pointer
                     dark:hover:bg-red-700 hover:bg-red-500  hover:text-white py-2
                      px-4 rounded font-semibold dark:font-normal"
                >
                  削除 Delete
                </button>
                <p className="dark:text-gray-500">このボタンはご本人のみ表示</p>
              </div>
            </div>
          </div>

          {/*-----------------------------School Delete Modal-------------------------- */}
          {showModal && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/30"
            >
              <motion.div
                initial={{ scale: 0, rotate: -50 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl "
              >
                <h2
                  className="text-lg font-semibold text-center text-red-600
                     dark:text-white dark:font-normal"
                >
                  Delete this Job-Post Forever?
                </h2>
                <p className="text-sm  dark:text-gray-300 text-center my-2">
                  This cannot be Recovered.
                </p>

                <div className="flex justify-center gap-4 mt-6 ">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg bg-gray-300  cursor-pointer
                         dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700
                         cursor-pointer text-white text-sm"
                  >
                    Yes, Delete
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolsInJapan;
