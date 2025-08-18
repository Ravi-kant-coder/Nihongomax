"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Upload } from "lucide-react";
import userStore from "@/store/userStore";
import { usePostStore } from "@/store/usePostStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useJobStore } from "@/store/useJobStore";

const jobSchema = yup.object().shape({
  company: yup.string().required("Company name is required"),
  title: yup.string().required("Job title is required"),
  jlpt: yup.string().optional(),
  location: yup.string().required("Location is required"),
  salary: yup.string().required("Salary is required"),
  contact: yup
    .string()
    .required("Contact is required")
    .test(
      "valid-contact",
      "Must be a valid email or 10-digit phone number",
      (val) => {
        if (!val) return false;
        const phoneRegex = /^[0-9]{10}$/;
        const emailRegex = /^\S+@\S+\.\S+$/;
        return phoneRegex.test(val) || emailRegex.test(val);
      }
    ),
  jobDescription: yup
    .string()
    .required("Job description is required")
    .min(10, "Description must be at least 10 characters"),
});

const JobTrigger = () => {
  const [filePreview, setFilePreview] = useState(null);
  const [fileType, setFileType] = useState("");
  const { user } = userStore();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = today.toLocaleString("en-US", { month: "long" });
  const year = today.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  const { createJobZust } = useJobStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(jobSchema),
  });

  const handleFileChnage = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file), setFileType(file.type);
    setFilePreview(URL.createObjectURL(file));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileType(file.type);
    setFilePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // frontend already uploads file to cloudinary, so just attach mediaUrl
      const jobData = {
        ...data,
        mediaUrl: filePreview || null,
        mediaType: fileType.startsWith("image") ? "image" : "video",
      };
      await createJobZust(jobData);
      reset();
      setSelectedFile(null);
      setFilePreview(null);
      setShowImageUpload(false);
    } catch (error) {
      console.error("Handler-Error Job:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-8/9 md:w-2/3 dark:bg-[rgb(10,10,10)] mb-10 p-2 md:p-4 rounded-lg
     bg-[rgb(170,170,170)] "
    >
      <div className="flex items-center justify-between mb-4">
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
        <p className="font-semibold mr-4">Post Job</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* -----------------Company Image Upload ---------------*/}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <div
            className="relative md:w-50 cursor-pointer border-2 border-dashed border-gray-700
                    rounded-lg flex items-center justify-center hover:bg-gray-300 group
                    dark:hover:bg-[rgb(36,37,38)] dark:border-gray-400 p-2"
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
                <Plus className="h-12 w-12 dark:text-gray-400 text-gray-700 mb-2" />
                <p className="text-center dark:text-gray-400">
                  Add Company Photo/video
                </p>
              </div>
            )}
            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>

          {/* ----------------Company Name and date---------------- */}
          <div className="flex flex-col w-full">
            <Input
              placeholder="Enter Company's name"
              className="dark:border-gray-700 bg-white dark:bg-black "
              {...register("company")}
            />
            {errors.company && (
              <p className="text-red-700 text-xs">{errors.company.message}</p>
            )}
            <p className="mt-2 ml-2 text-xs dark:text-gray-300">
              {formattedDate}
            </p>
          </div>
        </div>

        <Input
          placeholder="Enter Job Title"
          className="dark:border-gray-700 bg-white dark:bg-black "
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-700 text-xs">{errors.title.message}</p>
        )}

        <Input
          placeholder="JLPT Level (or other requirements)"
          className="dark:border-gray-700 bg-white dark:bg-black md:w-[70%]"
          {...register("requirements")}
        />

        <Input
          placeholder="Job Location"
          className="dark:border-gray-700 bg-white dark:bg-black md:w-[70%]"
          {...register("location")}
        />
        {errors.location && (
          <p className="text-red-700 text-xs">{errors.location.message}</p>
        )}

        <Input
          placeholder="Salary offered"
          className="dark:border-gray-700 bg-white dark:bg-black md:w-[70%]"
          {...register("salary")}
        />
        {errors.salary && (
          <p className="text-red-700 text-xs">{errors.salary.message}</p>
        )}

        <Input
          placeholder="Mobile or Email"
          className=" bg-white dark:bg-black dark:border-gray-700"
          {...register("contact")}
        />
        {errors.contact && (
          <p className="text-red-700 text-xs">{errors.contact.message}</p>
        )}

        <Textarea
          placeholder="Write a description/details about the job..."
          className="min-h-[100px] text-lg border-1 border-white bg-white
             dark:bg-black rounded-md dark:border-gray-700"
          {...register("jobDescription")}
        />
        {errors.jobDescription && (
          <p className="text-red-700 text-xs">
            {errors.jobDescription.message}
          </p>
        )}
        <div>
          <Button
            type="submit"
            className="w-1/2 text-[15px] dark:bg-gray-900 dark:text-gray-400 cursor-pointer
             hover:bg-gray-900 bg-black dark:hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Job Now"}
          </Button>
          <p className="mb-2 mt-1 dark:text-gray-300 text-sm ml-4">
            You can Edit/Delete it anytime
          </p>
        </div>
      </form>
    </div>
  );
};

export default JobTrigger;
