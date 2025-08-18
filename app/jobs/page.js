"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LeftSideBar from "@/app/LeftSideBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  IndianRupee,
  CircleDollarSign,
  Mail,
  Languages,
} from "lucide-react";
import ScrollupBtn from "../ScrollupBtn";
import { useJobStore } from "@/store/useJobStore";
import { formateDate } from "@/lib/utils";

const Jobs = () => {
  const { jobs, fetchJobsZust, deleteJobZust } = useJobStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchJobsZust();
  }, [fetchJobsZust]);

  const handleJobDelete = async (jobId) => {
    try {
      const result = await deleteJobZust(jobId);
      console.log("Job delete Handler result:", result);
    } catch (error) {
      console.error("Handler error:", error);
    }
  };

  return (
    <div className="flex my-20">
      <LeftSideBar />
      <motion.div
        className="md:ml-60 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="text-4xl text-center font-bold">Apply for Jobs</h1>
        {jobs?.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="md:mx-20 md:my-8">
              <div
                className="my-2 bg-white rounded-xl p-6 md:space-y-4 space-y-2 border
                 border-black dark:border-gray-200 dark:bg-black"
              >
                <div className="flex flex-col items-start justify-between">
                  <div className="flex items-center">
                    <div className="relative mx-auto my-auto overflow-hidden rounded p-1">
                      <Avatar className="w-30 h-20 rounded mr-2">
                        <AvatarImage
                          src={job.mediaUrl}
                          className="object-cover"
                        />
                        <AvatarFallback
                          className="bg-gray-400 dark:bg-gray-500 w-30 h-20 lg:text-4xl
                          font-semibold rounded mr-2 text-2xl"
                        >
                          {job.company.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <p
                        className="cursor-pointer font-semibold hover:underline text-2xl
                       text-gray-700 dark:text-gray-300"
                      >
                        {job.company}
                      </p>
                      <p
                        className="text-xs flex flex-col md:text-sm
                         text-gray-700 dark:text-gray-400 font-normal"
                      >
                        {formateDate(job?.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
                <p className=" text-xl font-semibold">{job.title}</p>
                <div className="flex">
                  <p className="font-semibold">Requirements:&nbsp;</p>
                  <span> {job.requirements}</span>
                </div>
                <div className="text-xs dark:text-gray-400 md:space-y-2 space-y-1">
                  <div className="flex items-center">
                    Location:
                    <MapPin size={20} strokeWidth={1} className="mr-2" />{" "}
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    Salary:
                    <IndianRupee size={16} strokeWidth={1} className="mr-2" />
                    {job.salary}
                  </div>
                  <div className="flex items-center">
                    Contact: <Mail size={18} strokeWidth={1} className="mr-2" />
                    {job.contact}
                  </div>
                  <div className="flex items-center text-sm">
                    <p className="font-semibold">Job Description:&nbsp;</p>
                    <span> {job.jobDescription}</span>
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
                        onClick={() => {
                          setShowModal(false), handleJobDelete(job._id);
                        }}
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
          ))
        ) : (
          <h2 className="text-center text-2xl mt-8 dark:text-gray-400 text-gray-700">
            No Jobs Available right now.
            <br />
            Plz check back later.
            <p className="mt-4"> 頑張ってね。応援しています！</p>
            <p className="text-lg"> (All the best. We are with you)</p>
          </h2>
        )}
      </motion.div>

      <ScrollupBtn />
    </div>
  );
};

export default Jobs;
