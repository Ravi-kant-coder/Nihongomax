"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, IndianRupee, Mail, Languages, Phone } from "lucide-react";
import { formateDate } from "@/lib/utils";
import userStore from "@/store/userStore";

const JobCard = ({ job, handleJobDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = userStore();

  if (!job) return null;

  return (
    <div>
      <div className="md:mx-20 md:my-8 m-6">
        <div
          className=" bg-white rounded-xl p-6 md:space-y-4 space-y-2 border
                 border-black dark:border-gray-200 dark:bg-black"
        >
          <div className="flex flex-col items-start justify-between">
            <div className="flex items-center">
              <div className="relative mx-auto my-auto overflow-hidden rounded p-1">
                <Avatar className="w-30 h-20 rounded mr-2">
                  {job?.mediaUrl && (
                    <AvatarImage src={job?.mediaUrl} className="object-cover" />
                  )}

                  <AvatarFallback
                    className="bg-gray-400 dark:bg-gray-500 w-30 h-20 lg:text-4xl
                          font-semibold rounded mr-2 text-2xl"
                  >
                    {job?.company?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className="font-semibold text-2xl text-gray-800 dark:text-gray-300">
                  {job?.company}
                </div>
                <div
                  className="text-xs flex flex-col md:text-sm
                         text-gray-700 dark:text-gray-400 font-normal"
                >
                  {formateDate(job?.createdAt)}
                </div>
              </div>
            </div>
          </div>
          <p className=" text-xl font-semibold dark:font-normal">
            {job?.title}
          </p>
          <div>
            <div className="mb-2">
              <p className="font-semibold flex items-center dark:font-normal">
                Requirements:
              </p>
              <span>
                {job?.requirements ||
                  "No specific requirements mentioned for this job post."}
              </span>
            </div>
            <div className="dark:text-gray-400 md:space-y-3 space-y-1">
              <div className="flex items-center text-sm">
                <MapPin size={18} strokeWidth={2} className="mr-2" />{" "}
                <p className="font-semibold mr-2">Location:</p>
                {job?.location || "Remote"}
              </div>
              <div className="flex items-center text-sm">
                <IndianRupee size={16} strokeWidth={2} className="mr-2" />
                <p className="font-semibold mr-2">Salary:</p>
                {job?.salary || "Not Disclosed"}
              </div>
              <div className="flex items-center text-sm">
                <Mail size={16} strokeWidth={2} className="mr-2" />
                <p className="font-semibold mr-2">Email:</p>
                {job?.email || "Not Provided"}
              </div>
              <div className="flex items-center text-sm">
                <Phone size={16} strokeWidth={2} className="mr-2" />
                <p className="font-semibold mr-2">Mobile:</p>
                {job?.mobile || "Not Provided"}
              </div>
              <div className="items-center text-sm">
                <p className="font-semibold">Job&nbsp;Description:</p>
                <span>
                  {job?.jobDescription ||
                    "No description provided for this job post."}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center">
            <div className="text-sm">
              {user?._id === job?.user?._id && (
                <>
                  <button
                    className="mt-4 bg-gray-400 dark:bg-red-900 cursor-pointer
                     dark:hover:bg-red-700 hover:bg-gray-700  hover:text-white py-2
                      px-4 rounded font-semibold dark:font-normal"
                    onClick={() => {
                      setShowDeleteModal(true);
                    }}
                  >
                    Edit this Job-Post
                  </button>
                  <p className="dark:text-gray-500 text-xs">
                    Only you can see this button {user?.username?.split(" ")[0]}
                  </p>
                </>
              )}
            </div>
            <div className="text-sm md:ml-10">
              {user?._id === job?.user?._id && (
                <>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="mt-4  bg-red-400 dark:bg-red-900 cursor-pointer
                     dark:hover:bg-red-700 hover:bg-red-500  hover:text-white py-2
                      px-4 rounded font-semibold dark:font-normal"
                  >
                    Delete this Job-Post
                  </button>
                  <p className="dark:text-gray-500 text-xs">
                    Only you can see this button {user?.username?.split(" ")[0]}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        {/*-----------------------------Job Delete Modal-------------------------- */}
        {showDeleteModal && (
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
                Delete this Job-Post Forever {user?.username?.split(" ")[0]}?
              </h2>
              <p className="text-sm  dark:text-gray-300 text-center my-2">
                This cannot be Recovered.
              </p>

              <div className="flex justify-center gap-4 mt-6 ">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300  cursor-pointer
                         dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    handleJobDelete(job?._id);
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
    </div>
  );
};

export default JobCard;
