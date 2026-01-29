"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import JobTrigger from "@/app/recruiters/JobTrigger";

import {
  MapPin,
  IndianRupee,
  Mail,
  Languages,
  ArrowBigDown,
  Phone,
  MonitorSmartphone,
} from "lucide-react";

const Recruiters = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = today.toLocaleString("en-US", { month: "long" });
  const year = today.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mx-3">
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
        <JobTrigger />
      </div>
      <h2
        className="md:text-2xl font-semibold flex justify-center
        items-center dark:text-gray-400"
      >
        Your Job-Post will look something like this
        <ArrowBigDown fill="black" size={40} className="mx-2 shrink-0" />
        (or Call 7678461209 for details)
      </h2>

      {/* --------------------------Sample Job Post---------------------------- */}
      <div className="flex md:mx-20 md:my-8 flex-col mx-4 md:ml-30 mb-20 xl:mx-40">
        <div
          className="my-2 bg-white rounded-xl p-6 md:space-y-4 space-y-2 border
                 border-black dark:border-gray-200 dark:bg-black"
        >
          <div className="flex flex-col items-start justify-between">
            <div className="flex items-center">
              <div className="relative mx-auto my-auto overflow-hidden rounded mr-4">
                <Avatar className="w-30 h-20 rounded">
                  <AvatarImage src={"/tsukimi.png"} className="object-cover" />
                  <AvatarFallback
                    className="bg-gray-400 dark:bg-gray-500 w-30 h-20 lg:text-4xl
                          font-semibold rounded mr-2 text-2xl"
                  >
                    N
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <p
                  className="font-semibold md:text-2xl text-xl text-gray-700
                     dark:text-gray-300"
                >
                  New Technologies xyz Pvt. Ltd.
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
          <p className="md:text-xl font-semibold dark:font-normal">
            Japanese Language Translator, Product Manager, Sales Executive - IT
            Sector
          </p>
          <div>
            <div className="mb-2">
              <p className="font-semibold flex items-center dark:font-normal">
                Requirements:
              </p>
              <span>
                {" "}
                New Technologies xyz Pvt. Ltd. is the largest private provider
                of IT services in Japan, We are looking for candidates who are
                driven and motivated in developing next generation technologies.
                We are excited to welcome you to our family brimming with
                innovation and the love for UI-UX.
              </span>
            </div>
            <div className="dark:text-gray-400 md:space-y-3 space-y-1">
              <div className="flex items-center text-sm">
                <MapPin size={18} strokeWidth={2} className="mr-2" />{" "}
                <p className="font-semibold mr-2">Location:</p>
                Xyz, Pune, India
              </div>
              <div className="flex items-center text-sm">
                <IndianRupee size={16} strokeWidth={2} className="mr-2" />
                <p className="font-semibold mr-2">Salary:</p>
                INR 50,000 - 60,000 per month
              </div>
              <div className="flex items-center text-sm">
                <Mail size={16} strokeWidth={2} className="mr-2" />
                <p className="font-semibold mr-2">Email:</p>
                company@email.com
              </div>
              <div className="flex items-center text-sm">
                <Phone size={16} strokeWidth={2} className="mr-2" />
                <p className="font-semibold mr-2">Mobile:</p>
                9999999999
              </div>
              <div className="flex items-center text-sm">
                <MonitorSmartphone size={16} strokeWidth={2} className="mr-2" />
                <p className="font-semibold mr-2">Website:</p>
                <a
                  href={`https://learnjapanesedelhi.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-800 dark:text-blue-500 hover:underline break-all"
                >
                  learnjapanesedelhi.com
                </a>
              </div>
              <div className="items-center text-sm">
                <p className="font-semibold">Job&nbsp;Description:</p>
                <span>
                  The candidate has to frequently travel to Japan, besides the
                  breifing and translating the documents, the candidate will
                  also be responsible for managing the product and ensuring the
                  quality of the product. If you are driven and have a passion
                  for technology and a desire to inspire and share your
                  knowledge !
                </span>
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
  );
};

export default Recruiters;
