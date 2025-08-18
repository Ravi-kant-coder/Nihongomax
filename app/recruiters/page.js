"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LeftSideBar from "@/app/LeftSideBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import toast from "react-hot-toast";
import { useJobStore } from "@/store/useJobStore";
import {
  MapPin,
  IndianRupee,
  CircleDollarSign,
  Mail,
  Languages,
  ArrowBigDown,
} from "lucide-react";
import JobTriggergpt from "@/app/recruiters/JobTrigger";

const Recruiters = () => {
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
        <h1
          className="md:text-5xl text-xl text-gray-800 font-semibold text-center
         dark:text-[rgb(150,150,150)]"
        >
          Dear Recruiters, Post JOBS for FREE
        </h1>
        <h2
          className=" font-semibold text-gray-600 text-center md:text-4xl text-lg md:mt-4
        dark:text-gray-500"
        >
          1万人以上に求人情報をご掲載ください。完全に無料です。
        </h2>
        <h2
          className="md:text-xl text-sm dark:text-gray-300 text-center dark:font-normal 
          md:mt-2 font-semibold"
        >
          Show your Job posts to over 10,000 Japanese learners and working
          professionals
        </h2>
        <div className="flex justify-center items-center mt-6">
          <JobTriggergpt />
        </div>
        <h2
          className="md:text-2xl font-semibold flex justify-center
        items-center dark:text-gray-400"
        >
          Your Job-Post will look something like this
          <ArrowBigDown fill="black" size={40} className="mx-2 shrink-0" />
          (or Call 7678461209 for details)
        </h2>
        <div className="flex flex-col mx-3 md:ml-30 mb-20 ">
          <div className="md:mx-20 md:my-8">
            <div
              className="my-2 bg-white rounded-xl p-6 md:space-y-4 space-y-2 border
                 border-black dark:border-gray-200 dark:bg-black"
            >
              <div className="flex flex-col items-start justify-between">
                <div className="flex items-center">
                  <div className="relative mx-auto my-auto overflow-hidden rounded p-1">
                    <Avatar className="w-30 h-20 rounded mr-2">
                      <AvatarImage src={"/try.jpg"} className="object-cover" />
                      <AvatarFallback
                        className="bg-gray-400 dark:bg-gray-500 w-30 h-20 lg:text-4xl
                          font-semibold rounded mr-2 text-2xl"
                      >
                        N
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <p className="font-semibold text-2xl text-gray-700 dark:text-gray-300">
                      New Technologies Pvt. Ltd.
                    </p>
                    <p
                      className="text-xs flex flex-col md:text-sm
                         text-gray-700 dark:text-gray-400"
                    >
                      {formattedDate}
                    </p>
                  </div>
                </div>
              </div>
              <p className=" text-xl font-semibold dark:font-normal">
                Japanese Language Translator cum Interpreter, Product Manager
              </p>
              <div className="flex items-center">
                <p className="font-semibold dark:font-normal mr-6">
                  Requirements:&nbsp;
                </p>
                <span className="dark:font-normal text-gray-700 dark:text-gray-400">
                  {" "}
                  JLPT N3 or Above. University graduate with at least a
                  bachelor’s degree (in any subject). Professional in all
                  aspects of behavior, a team player, flexible, cheerful, and
                  energetic
                </span>
              </div>
              <div className="text-sm dark:text-gray-400 md:space-y-2 space-y-1">
                <div className="flex items-center">
                  Location:
                  <MapPin size={20} strokeWidth={1} className="mr-2" /> ABC
                  city, XYZ state, India
                </div>
                <div className="flex items-center">
                  Salary:
                  <IndianRupee size={16} strokeWidth={1} className="mr-2" />
                  50,000 - 60,000 per month
                </div>
                <div className="flex items-center">
                  Contact: <Mail size={18} strokeWidth={1} className="mr-2" />
                  dummy@email.com
                </div>
                <div className="flex items-center text-sm">
                  <p className="font-semibold dark:font-normal mr-6">
                    Job Description:&nbsp;
                  </p>
                  <span className="dark:font-normal text-gray-700 dark:text-gray-400">
                    {" "}
                    New Technologies Pvt. Ltd. is the largest private provider
                    of IT services in Japan, We are passionate about creating
                    motivation in the next generation we are excited to welcome
                    you to the Interac teaching family!
                  </span>
                </div>
              </div>
              <div className="flex justify-start items-center">
                <div className="text-sm">
                  <button
                    className="mt-4 bg-gray-400 dark:bg-red-900 cursor-pointer
                     dark:hover:bg-red-700 hover:bg-gray-700  hover:text-white py-2
                      px-4 rounded font-semibold dark:font-normal"
                  >
                    Edit this Job-Post
                  </button>
                  <p className="dark:text-gray-500">
                    Only you will see this button
                  </p>
                </div>
                <div className="text-sm md:ml-10">
                  <button
                    onClick={() => setShowModal(true)}
                    className="mt-4  bg-red-400 dark:bg-red-900 cursor-pointer
                     dark:hover:bg-red-700 hover:bg-red-500  hover:text-white py-2
                      px-4 rounded font-semibold dark:font-normal"
                  >
                    Delete this Job-Post
                  </button>
                  <p className="dark:text-gray-500">
                    Only you will see this button
                  </p>
                </div>
              </div>
            </div>
            {/*-----------------------------Job Delete Modal-------------------------- */}
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
    </div>
  );
};

export default Recruiters;
