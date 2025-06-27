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
import Image from "next/image";

const dummySchools = [
  {
    schoolimg1: "/Vertical1.jpg",
    schoolimg2: "/Horizontal1.jpg",
    schoolName: "First Study Osaka",
    company: "Tech Solutions",
    location: "New York, NY",
    description:
      "Develop and maintain web applications using modern technologies.",
    salary: "$80,000 - $100,000",
    datePosted: "2025-06-12",
    japanese: "JLPT-N3",
    requirements:
      "Bachelor's degree in Computer Science field. Experience with JavaScript, React, and Node.js.",
    contactEmail: "dummy@email.com",
    key: "1",
  },
  {
    schoolimg1: "/Circular.jpg",
    schoolimg2: "/Girl.jpg",
    schoolName: "Kyoshin Academy",
    company: "Phalana Solutions Inc.",
    location: "Japan, JP",
    description:
      "Sustain the degree in Networking or Experience with JavaScript, React, and related field. Experience with JavaScript, React,  using modern technologies.",
    salary: "$80,000 - $100,000",
    datePosted: "2025-06-8",
    jobType: "Full-time",
    japanese: "JLPT-N2",
    requirements:
      "Bachelor's degree in Networking or Experience with JavaScript, React, and related field. Experience with JavaScript, React, and Node.js.",
    contactEmail: "dummy@email.com",
    key: "2",
  },

  {
    schoolimg1: "/Horizontal2.jpg",
    schoolimg2: "/Vertical2.jpg",
    schoolName: "Miraito Japanese Academy",
    company: "Dhinkana Private Ltd.",
    location: "Nimrana, India",
    description:
      "Sustain the existing system and maintain network using modern technologies.",
    salary: "$80,000 - $100,000",
    datePosted: "2025-1-01",
    jobType: "Full-time",
    japanese: "JLPT-N3, NAT-Q2",
    requirements:
      "Bachelor's degree in Networking or related field. Experience with JavaScript, React, and Node.js.",
    contactEmail: "dummy@email.com",
    key: "3",
  },
];

const formatDate = (createdAt) => {
  if (!createdAt) return "";

  const date = new Date(createdAt);
  const now = new Date();

  // Calculate the difference in milliseconds
  const diff = now - date;

  // Convert milliseconds to seconds, minutes, hours, days, weeks
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) {
    // More than a week ago
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } else if (days > 0) {
    // Days ago
    return `${days === 1 ? "a day ago" : `${days} days ago`}`;
  } else if (hours > 0) {
    // Hours ago
    return `${hours === 1 ? "an hour ago" : `${hours} hours ago`}`;
  } else if (minutes > 0) {
    // Minutes ago
    return `${minutes === 1 ? "a minute ago" : `${minutes} minutes ago`}`;
  } else {
    // Seconds ago
    return `${seconds === 1 ? "a second ago" : `${seconds} seconds ago`}`;
  }
};

const SchoolCard = () => {
  const [localDate, setLocalDate] = useState("");
  const [localTime, setLocalTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  // useEffect(() => {
  //   const formatted = formatDate(createdAt);
  //   setFormattedDate(formatted);
  // }, [createdAt]);

  return (
    <>
      <div className="md:mt-20 mt-25 mb-20">
        <div className="p-2">
          <LeftSideBar />
        </div>
        <div className="flex flex-col md:ml-80 mb-20 mx-5">
          <h1 className="md:text-4xl text-xl font-bold dark:text-[rgb(150,150,150)] text-center">
            Schools in Japan Nihongomax has tie up with
          </h1>
          {dummySchools.map((queryObj) => (
            <div key={queryObj.key} className="md:mx-30 md:my-2 ">
              <div className="my-2 bg-white dark:bg-black rounded-xl p-6 md:space-y-4 space-y-2 border border-black dark:border-gray-200">
                <div className="flex items-start gap-2 justify-start">
                  <div className="relative w-full aspect-[4/3] sm:w-40 md:w-48 lg:w-56">
                    <Image
                      src={queryObj.schoolimg1}
                      alt="School Image"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="relative w-full aspect-[4/3] sm:w-40 md:w-48 lg:w-56">
                    <Image
                      src={queryObj.schoolimg2}
                      alt="School Image"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </div>
                <div className=" text-xl font-semibold">
                  <span>{queryObj.schoolName}</span>
                </div>{" "}
                <p className="text-sm">
                  Basic information: {queryObj.requirements}
                </p>
                <div className="text-xs dark:text-gray-400 md:space-y-2 space-y-1">
                  <div className="flex items-center">{queryObj.japanese}</div>
                  <div className="flex items-center">{queryObj.location}</div>
                  <div className="flex items-center">{queryObj.salary}</div>
                  <div className="flex items-center">
                    {queryObj.contactEmail} {queryObj.phone}
                  </div>
                  <div className="flex items-center text-sm">
                    School Details: {queryObj.description} {queryObj.phone}
                  </div>
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-400 font-normal">
                  Posted {formatDate(queryObj.datePosted)}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <button
                    onClick={() => setShowModal(true)}
                    className=" bg-black text-white w-100 dark:bg-green-900 cursor-pointer dark:hover:bg-black hover:bg-green-900  hover:text-white py-2 px-4 rounded font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
              {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                  <motion.div
                    initial={{ scale: 0, rotate: -50 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl "
                  >
                    <h2 className="text-lg font-semibold text-center text-red-600 dark:text-white">
                      Delete this Post Forever Bhumika?
                    </h2>
                    <p className="text-sm  dark:text-gray-300 text-center my-2">
                      This cannot be Recovered.
                    </p>

                    <div className="flex justify-center gap-4 mt-6 ">
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 rounded-lg bg-gray-300  cursor-pointer dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        // onClick={() => handleDelete(queryObj._id)}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 cursor-pointer text-white text-sm"
                      >
                        Yes, Delete
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SchoolCard;
