"use client";
import { useState } from "react";
import { X, CircleCheckBig, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";
import { useAdminData } from "@/stores/useAdminData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// This component is used to create a Job post by Recruiters for students.

const JobPostForm = () => {
  const { createQuery } = useAdminData();
  const [studentName, setStudentName] = useState("");
  const [mobile, setMobile] = useState("");
  const [queryText, setQueryText] = useState("");
  const [submit, setSubmit] = useState(true);
  const [submitted, setSubmitted] = useState("");
  const [isNameReq, setIsNameReq] = useState(false);
  const [isMobReq, setIsMobReq] = useState(false);
  const [isQueryReq, setIsQueryReq] = useState(false);
  const [invalidMob, setInvalidMob] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = today.toLocaleString("en-US", { month: "long" });
  const year = today.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  const profileImageInputRef = useState(null);
  const handleContactForm = async (e) => {
    e.preventDefault();

    // Frontend code from here
    if (!studentName) {
      setIsNameReq(true);
      return;
    } else if (!mobile.trim()) {
      setIsMobReq(true);
      setInvalidMob(false);
      return;
    } else if (!queryText) {
      setIsQueryReq(true);
      return;
    } else if (mobile.length < 10 || mobile.length > 10) {
      setIsMobReq(false);
      setInvalidMob(true);
      return;
    } else null;

    // Backend code from here
    const formData = { studentName, mobile, queryText };
    try {
      await createQuery(formData);
      setStudentName("");
      setMobile("");
      setQueryText("");
      setSubmitted(true);
      setSubmit(false);
      setFeedback(`Thank you ${studentName}`);
      setTimeout(() => {
        setSubmit(true);
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error message:", error.message);
    }
  };

  const handleNameChange = (e) => {
    let val = e.target.value;

    // Allow only letters, spaces, and hyphens
    if (/^[a-zA-Z\s]*$/.test(val)) {
      // Trim leading/trailing spaces and multiple internal spaces
      val = val.replace(/\s+/g, " ").trimStart();

      // Capitalize first letter and remove error msg
      if (val.length >= 0) {
        val = val.charAt(0).toUpperCase() + val.slice(1);
        setIsNameReq(false);
      }

      setStudentName(val);
    }
  };
  return (
    <div className="w-8/9 md:w-2/3 dark:bg-[rgb(30,30,30)] px-2 bg-[rgb(170,170,170)] lg:p-5 py-10 md:rounded-lg rounded-lg">
      <div className="text-center mb-2 ">
        <h1 className="md:text-lg text-sm mb-5 ">
          Fill to Post Jobs. In case of any doubt, Call us 7678461209
          <p className="md:text-sm text-xs">(Tue Thu OFF)</p>
        </h1>
        <div className="flex items-center gap-4 text-gray-500"></div>
      </div>

      <form onSubmit={handleContactForm}>
        <div className="space-y-4">
          <div className="flex items-center ">
            <div className="flex flex-col items-center mr-2 md:mr-10">
              <Avatar className="w-15 h-15 border-2 border-white mb-2">
                <AvatarImage />
                <AvatarFallback className="dark:bg-gray-800 text-3xl"></AvatarFallback>
              </Avatar>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                // ref={profileImageInputRef}
                // onChange={handleProfilePictureChange}
              />
              <button
                className="border text-xs dark:bg-[rgb(30,30,30)] md:w-50 rounded-md md:text-sm p-1 flex-col md:flex-row cursor-pointer bg-[rgb(170,170,170)]  dark:hover:bg-black hover:bg-gray-300  flex items-center justify-center"
                type="button"
                variant="outline"
                size="sm"
                onClick={() => profileImageInputRef.current?.click()}
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
                  value={studentName}
                  onChange={handleNameChange}
                />
                {isNameReq && (
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
          <div className="flex justify-between flex-col h-20 w-full ">
            <div className="space-y-2 ">
              <Label className="sr-only" htmlFor="queryName">
                Username
              </Label>
              <Input
                id="queryName"
                name="queryNameKey"
                type="text"
                placeholder="Enter Job Title"
                className="dark:border-gray-400 bg-white dark:bg-black"
                value={studentName}
                onChange={handleNameChange}
              />
              {isNameReq && (
                <p className="text-red-700 text-xs">Job Title is required.</p>
              )}
            </div>
            <div className="flex flex-col text-xs md:text-sm">
              {formattedDate}
            </div>
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
              value={mobile}
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
            placeholder="Write us your query & we will call you..."
            className="min-h-[100px] text-lg border-1 border-white bg-white dark:bg-black rounded-md"
            value={queryText}
            onChange={(e) => {
              let val = e.target.value;
              if (val.length >= 0) {
                setIsQueryReq(false);
                setQueryText(val);
              }
            }}
          />{" "}
          {isQueryReq && (
            <p className="text-red-700 text-xs">Your Query is required.</p>
          )}
          {submit && (
            <Button
              className="w-full text-[15px] hover:dark:bg-black hover:dark:border-1 hover:dark:border-white dark:bg-gray-400 hover:dark:text-white cursor-pointer"
              type="submit"
            >
              <p>Post Job Now</p>
            </Button>
          )}
          {submitted && (
            <motion.p
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex items-center py-2 text-white justify-center w-full rounded-md p-1 bg-green-900 "
            >
              <span className="mr-2">{feedback}</span>{" "}
              <CircleCheckBig className="font-bold" />
            </motion.p>
          )}
        </div>
        <p className="text-center mt-5">You can delete it anytime</p>
      </form>
    </div>
  );
};

export default JobPostForm;
