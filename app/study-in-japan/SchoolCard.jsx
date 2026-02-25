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
import { formatDate } from "@/lib/utils";
import userStore from "@/store/userStore";
import EditSchool from "./EditSchool";
import Spinner from "../Spinner";
import MediaShowcase from "../components/MediaShowcase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useT from "../hooks/useT";
import DeleteConfModal from "../components/DeleteConfModel";

const SchoolCard = ({ school, handleSchoolDelete, loading }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSchoolEditModal, setShowSchoolEditModal] = useState(false);
  const [readyTodel, setReadyTodel] = useState(false);
  const { user } = userStore();
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = today.toLocaleString("en-US", { month: "long" });
  const year = today.getFullYear();
  const t = useT();

  if (!school) return null;

  const homepageUrl =
    school.homepage.startsWith("http://") ||
    school.homepage.startsWith("https://")
      ? school.homepage
      : `https://${school.homepage}`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, height: 0, rotate: -5 }}
        animate={{ opacity: 1, height: "auto", rotate: readyTodel ? -5 : 0 }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`${readyTodel ? "bg-[rgb(255,200,200)] dark:bg-[rgb(70,0,0)]" : "dark:bg-[rgb(55,55,55)] bg-white "} 
    shadow-gray-400 md:mx-20 md:my-8 m-6  rounded-xl p-6 md:space-y-4 space-y-2 border
          border-black dark:border-gray-200 dark:bg-black xl:mx-40`}
      >
        <div className="flex flex-col items-start justify-between">
          <div className="mb-4 w-full flex justify-between">
            <div>
              <p className="font-semibold md:text-2xl text-xl dark:text-gray-300">
                {school?.schoolName}
              </p>
              <p className="text-xs flex flex-col md:text-sm text-gray-700 dark:text-gray-400">
                Posted {formatDate(school?.createdAt)}
              </p>
            </div>
            {school?.visibility ? (
              <div className="flex items-center mr-4">
                <Avatar>
                  <AvatarImage
                    className="object-cover"
                    src={school?.user?.profilePicture}
                  />
                  <AvatarFallback className="dark:bg-gray-800">
                    {school?.user?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-2">
                  掲載者
                  <p className="font-[450] capitalize">
                    {school?.user?.username}
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
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
          <div className="flex items-center">
            <Phone size={16} strokeWidth={2} className="mr-2" />
            <p className="font-semibold mr-2">Contact 連絡先 </p>&nbsp;
            {school?.mobile ? (
              <span>
                +81-{school.mobile.slice(0, 2)}-{school.mobile.slice(2, 6)}-
                {school.mobile.slice(6)}
              </span>
            ) : (
              <span className="text-gray-600 dark:text-gray-400">
                Not provided here
              </span>
            )}
          </div>

          <div className="items-center">
            {school?.schoolDescription ||
              "No other details provided by this School."}
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
                  onClick={() => {
                    setShowDeleteModal(true);
                    setReadyTodel(true);
                  }}
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
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/30 dark:bg-black/60 backdrop-blur-xs z-9999">
            <Spinner />
          </div>
        )}
      </motion.div>

      {/* --------------------Delete Confirmation Modal------------------- */}
      {showDeleteModal && (
        <DeleteConfModal
          user={user}
          item={t("school")}
          handleDelete={() => {
            setReadyTodel(false);
            handleSchoolDelete(school?._id);
          }}
          handleCancel={() => {
            setShowDeleteModal(false);
            setReadyTodel(false);
          }}
        />
      )}
      {/*-----------------------------School Edit Modal-------------------------- */}
      {showSchoolEditModal && (
        <EditSchool
          school={school}
          onClose={() => setShowSchoolEditModal(false)}
        />
      )}
    </>
  );
};

export default SchoolCard;
