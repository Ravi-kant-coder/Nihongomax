"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { ImageIcon, Laugh, Plus, Upload, VideoIcon, X } from "lucide-react";
import userStore from "@/store/userStore";
import { usePostStore } from "@/store/usePostStore";
import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const PostTrigger = () => {
  const [filePreview, setFilePreview] = useState(null);
  const [filePreviews, setFilePreviews] = useState([]);
  const [postContent, setPostContent] = useState("");
  const { user } = userStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const fileInputRef = useRef(null);
  const [submit, setSubmit] = useState(true);
  const [submitted, setSubmitted] = useState("");
  const [isCompNameReq, setIsCompNameReq] = useState(false);
  const [isJobTitleReq, setIsJobTitleReq] = useState(false);
  const [isMobReq, setIsMobReq] = useState(false);
  const [invalidMob, setInvalidMob] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = today.toLocaleString("en-US", { month: "long" });
  const year = today.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  const handleFileChnage = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file), setFileType(file.type);
    setFilePreview(URL.createObjectURL(file));
  };

  const handlePost = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("content", postContent);
      if (selectedFile) {
        formData.append("media", selectedFile);
      }
      await usePostStore.getState().handleCreatePost(formData);
      setPostContent("");
      setSelectedFile(null);
      setFilePreview(null);
      setIsPostTriggerOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-8/9 md:w-2/3 dark:bg-[rgb(10,10,10)] px-2 mb-10
     bg-[rgb(170,170,170)] lg:p-5 py-10 md:rounded-lg rounded-lg"
    >
      <div className="flex items-center space-x-3 py-4">
        <Avatar>
          <AvatarImage className="object-cover" src={user?.profilePicture} />
          <AvatarFallback className="dark:bg-gray-800">
            {user?.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{user?.username}</p>
        </div>
      </div>
      <form onSubmit={handlePost}>
        <AnimatePresence>
          {(showImageUpload || filePreviews.length > 0) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="relative mb-4 cursor-pointer border border-dashed border-white
                    rounded-lg flex items-center justify-center hover:bg-gray-300 group
                    dark:hover:bg-[rgb(36,37,38)] p-2"
              onClick={() => fileInputRef.current.click()}
            >
              {filePreview ? (
                fileType.startsWith("image") ? (
                  <img
                    src={filePreview}
                    alt="preview_img"
                    className="w-full h-auto max-h-[200px] object-cover"
                  />
                ) : (
                  <video
                    controls
                    src={filePreview}
                    className="w-full h-auto max-h-[200px] object-cover"
                  />
                )
              ) : (
                <div className="flex flex-col items-center">
                  <Plus
                    className="h-12 w-12 text-white mb-2 cursor-pointer 
                        group-hover:text-gray-600 dark:group-hover:text-white"
                  />
                  <p
                    className="text-center group-hover:text-black
                        dark:group-hover:text-white text-white"
                  >
                    Add Photo
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                multiple
                onChange={handleFileChnage}
                ref={fileInputRef}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="space-y-4">
          <div className="flex items-center ">
            <div className="flex flex-col items-center mr-2 md:mr-10">
              <Avatar
                className="w-15 h-15 border-2 border-white mb-2"
                onClick={() => setShowImageUpload(!showImageUpload)}
              >
                <AvatarImage />
                <AvatarFallback className="dark:bg-gray-800 text-3xl"></AvatarFallback>
              </Avatar>
              <button
                className="border text-xs dark:bg-[rgb(30,30,30)] md:w-50 rounded-md
                 md:text-sm p-1 flex-col md:flex-row cursor-pointer bg-[rgb(170,170,170)]
                 dark:hover:bg-black hover:bg-gray-300  flex items-center justify-center"
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowImageUpload(!showImageUpload)}
              >
                <Upload className="h-4 w-4 mr-3" />
                Company's Image
              </button>
            </div>
            <div className="flex justify-between flex-col h-20 w-full ">
              <div className="space-y-2 ">
                <Label className="sr-only" htmlFor="queryName">
                  Username
                </Label>
                <Input
                  id="queryName"
                  name="queryNameKey"
                  type="text"
                  placeholder="Enter Company's name"
                  className="dark:border-gray-400 bg-white dark:bg-black"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
                {isCompNameReq && (
                  <p className="text-red-700 text-xs">
                    Company's Name is required.
                  </p>
                )}
              </div>
              <div className="flex flex-col text-xs md:text-sm">
                {formattedDate}
              </div>
            </div>
          </div>
          <div className="flex justify-between flex-col md:w-2/3 ">
            <Label className="sr-only" htmlFor="queryName">
              Username
            </Label>
            <Input
              id="queryName"
              name="queryNameKey"
              type="text"
              placeholder="Enter Job Title"
              className="dark:border-gray-400 bg-white dark:bg-black"
              // value={}
              // onChange={handleNameChange}
            />
            {isJobTitleReq && (
              <p className="text-red-700 text-xs">Job Title is required.</p>
            )}
          </div>
          <div className="space-y-2 ">
            <Label className="sr-only" htmlFor="mobNumber">
              Mobile
            </Label>
            <Input
              id="mobNumber"
              name="queryNumKey"
              type="text"
              placeholder="Mobile Number"
              className=" bg-white dark:bg-black dark:border-gray-400"
              // value={}
              onChange={(e) => {
                const val = e.target.value;
                if (/^[0-9]*$/.test(val)) {
                  setMobile(val);
                  if (val.length > 0) {
                    setIsMobReq(false);
                    setInvalidMob(false);
                  }
                }
              }}
              maxLength={10}
            />{" "}
            {isMobReq ? (
              <p className="text-red-700 text-xs">Mobile number is required.</p>
            ) : invalidMob ? (
              <p className="text-red-700 text-xs ">
                Please put Valid 10 Digit Mobile number.
              </p>
            ) : null}
          </div>
          <Textarea
            placeholder="Write a description/details about the job..."
            className="min-h-[100px] text-lg border-1 border-white bg-white
             dark:bg-black rounded-md"
            // value={queryText}
            onChange={(e) => {
              let val = e.target.value;
              if (val.length >= 0) {
                // setIsQueryReq(false);
                // setQueryText(val);
              }
            }}
          />{" "}
          <p className="text-red-700 text-xs">Your Query is required.</p>
          {submit && (
            <Button
              className="w-1/2 text-[15px] hover:dark:bg-black hover:dark:border-1 
               hover:dark:border-white dark:bg-gray-900 hover:dark:text-white 
               cursor-pointer dark:border border-gray-500 font-[450] 
               dark:font-normal dark:text-gray-400"
              onClick={handlePost}
            >
              <p>Post Job Now</p>
            </Button>
          )}
          {submitted && (
            <motion.p
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex items-center py-2 text-white justify-center w-full rounded-md
               p-1 bg-green-900"
            >
              <span className="mr-2">{feedback}</span>{" "}
              <CircleCheckBig className="font-bold dark:font-semibold" />
            </motion.p>
          )}
        </div>
        <p className="mt-2 font-[450] dark:font-normal dark:text-gray-400">
          You can delete it anytime
        </p>
      </form>
    </div>
  );
};

export default PostTrigger;
