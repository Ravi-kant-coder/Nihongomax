"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  MonitorSmartphone,
  Mail,
  Phone,
  CalendarHeart,
} from "lucide-react";
import { formateDate } from "@/lib/utils";
import userStore from "@/store/userStore";
import EditSchool from "./EditSchool";
import Spinner from "../Spinner";
import MediaShowcase from "../components/MediaShowcase";

const SchoolCard = ({ school, handleSchoolDelete, loading }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSchoolEditModal, setShowSchoolEditModal] = useState(false);
  const { user } = userStore();
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = today.toLocaleString("en-US", { month: "long" });
  const year = today.getFullYear();

  if (!school) return null;

  const homepageUrl =
    school.homepage.startsWith("http://") ||
    school.homepage.startsWith("https://")
      ? school.homepage
      : `https://${school.homepage}`;

  return (
    <div className="md:mx-20 xl:mx-40 md:my-8 m-6">
      <div
        className=" bg-white rounded-xl p-6 md:space-y-4 space-y-2 border border-black
         dark:border-gray-200 dark:bg-black"
      >
        <div className="flex flex-col items-start justify-between">
          <div className="mb-4">
            <p className="font-semibold md:text-2xl text-xl dark:text-gray-300">
              {school?.schoolName}
            </p>
            <p className="text-xs flex flex-col md:text-sm text-gray-700 dark:text-gray-400">
              Posted {formateDate(school?.createdAt)}
            </p>
          </div>
          <div className="relative my-auto overflow-hidden rounded flex space-x-2 mb-2 flex-wrap">
            {school.uploadedMedia.map((media, index) => (
              <MediaShowcase parent={school} media={media} key={index} />
            ))}
          </div>
        </div>
        <div className="mb-2">
          <span>{school?.intro || "No Details given by this school."}</span>
        </div>
        <div className="dark:text-gray-400 md:space-y-3 space-y-1">
          <div className="flex items-center">
            <MapPin size={18} strokeWidth={2} className="mr-2" />{" "}
            <p className="font-semibold mr-2">Location 住所 - &nbsp;</p>
            {school?.location || "Location not specified"}
          </div>
          <div className="flex items-center">
            <CalendarHeart size={18} strokeWidth={2} className="mr-2" />{" "}
            <p className="font-semibold mr-2">Intakes 年間募集回数 - &nbsp;</p>
            {school?.intakes || "Intake information not provided"}
          </div>
          <div className="font-semibold flex items-center dark:font-normal">
            <MonitorSmartphone size={18} strokeWidth={2} className="mr-2" />{" "}
            Website ホームページ - &nbsp;
            <span className="ml-2 font-normal text-blue-800 dark:text-blue-500 hover:underline">
              {school?.homepage && (
                <a
                  href={homepageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all"
                >
                  {school.homepage.replace(/^https?:\/\//, "")}
                </a>
              )}
              {!school?.homepage && <span>Website not provided</span>}
            </span>
          </div>
          <div className="flex items-center ">
            <Mail size={16} strokeWidth={2} className="mr-2" />
            <p className="font-semibold mr-2">Email メール - &nbsp;</p>
            {school?.email || "Not Provided"}
          </div>
          <div className="flex items-center ">
            <Phone size={16} strokeWidth={2} className="mr-2" />
            <p className="font-semibold mr-2">Contact 連絡先 - &nbsp;</p>
            {`+81-${school?.mobile?.slice(0, 2)}-${school?.mobile?.slice(
              2,
              6,
            )}-${school?.mobile?.slice(6)}` || "Not disclosed"}
          </div>
          <div className="items-center">
            {school?.schoolDescription || "No details provided by this School."}
          </div>
        </div>
        <div className="flex justify-start items-center">
          <div className="text-sm">
            {user?._id === school?.user?._id && (
              <>
                <button
                  className="mt-4 bg-gray-400 dark:bg-gray-800 cursor-pointer dark:hover:bg-gray-900 hover:bg-gray-700
                  hover:text-white py-2 px-4 rounded font-semibold dark:font-normal"
                  onClick={() => {
                    setShowSchoolEditModal(true);
                    console.log("Edit school clicked");
                  }}
                >
                  編集する
                </button>
                <p className="dark:text-gray-500 text-xs">
                  {user?.username?.split(" ")[0]}様のみ表示
                </p>
              </>
            )}
          </div>
          <div className="text-sm md:ml-10">
            {user?._id === school?.user?._id && (
              <>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="mt-4  bg-red-400 dark:bg-red-900 cursor-pointer dark:hover:bg-red-700 hover:bg-red-500
                  hover:text-white py-2 px-4 rounded font-semibold dark:font-normal"
                >
                  削除する
                </button>
                <p className="dark:text-gray-500 text-xs">
                  {user?.username?.split(" ")[0]}様のみ表示
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      {loading && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-white/30
              dark:bg-black/60 backdrop-blur-xs z-[9999]"
        >
          <Spinner />
        </div>
      )}
      {/*-----------------------------School Delete Confirmation-------------------------- */}
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
              削除する {user?.username?.split(" ")[0]}?
            </h2>
            <p className=" dark:text-gray-300 text-center my-2">
              削除後は元に戻せません
            </p>

            <div className="flex justify-center gap-4 mt-6 ">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300  cursor-pointer
                dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
              >
                キャンセル
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  handleSchoolDelete(school?._id);
                }}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700
                         cursor-pointer text-white text-sm"
              >
                はい、削除する
              </button>
            </div>
          </motion.div>
        </div>
      )}
      {/*-----------------------------School Edit Modal-------------------------- */}
      {showSchoolEditModal && (
        <EditSchool
          school={school}
          onClose={() => setShowSchoolEditModal(false)}
        />
      )}
    </div>
  );
};

export default SchoolCard;
