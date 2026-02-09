"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import userStore from "@/store/userStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useJobStore } from "@/store/useJobStore";
import EmojiPickerButton from "../components/EmojiPickerButton";
import { useEmojiInsert } from "../hooks/useEmojiInsert";

const jobSchema = yup.object().shape({
  company: yup.string().required("Company name is required"),
  title: yup.string().required("Job title is required"),
  mobile: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .matches(/^\d{10}$/, {
      message: "Mobile number must be exactly 10 digits",
      excludeEmptyString: true,
    }),
  email: yup
    .string()
    .required("Email is required")
    .test("valid-email", "Must be a valid email", (val) => {
      if (!val) return false;
      const emailRegex = /^\S+@\S+\.\S+$/;
      return emailRegex.test(val);
    }),
  homepage: yup.string().required("Website is required"),
  jobDescription: yup
    .string()
    .required("Job description is required")
    .min(10, "Description must be at least 10 characters"),
});

const JobTrigger = () => {
  const [filePreview, setFilePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = userStore();
  const fileInputRef = useRef(null);
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = today.toLocaleString("en-US", { month: "long" });
  const year = today.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  const { createJobZust } = useJobStore();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const introEmoji = useEmojiInsert();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(jobSchema),
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      e.target.value = "";
      return;
    }
    setSelectedFile(file);
    setFilePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const jobData = new FormData();
      if (selectedFile) jobData.append("media", selectedFile);
      jobData.append("company", data.company);
      jobData.append("title", data.title);
      jobData.append("requirements", data.requirements);
      jobData.append("location", data.location);
      jobData.append("salary", data.salary);
      jobData.append("mobile", data.mobile);
      jobData.append("email", data.email);
      jobData.append("homepage", data.homepage);
      jobData.append("jobDescription", data.jobDescription);
      await createJobZust(jobData);
      reset();
      setSelectedFile(null);
      setFilePreview(null);
      setFeedback(
        `Thank you ${user?.username?.split(" ")[0]} for posting the job!`,
      );
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
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
        <div className="flex items-center space-x-3 py-2">
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

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* -----------------------Company Image Upload ---------------------*/}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <div
            className="relative md:w-50 cursor-pointer border-2 border-dashed border-gray-700
                    rounded-lg flex items-center justify-center hover:bg-gray-300 group
                    dark:hover:bg-[rgb(36,37,38)] dark:border-gray-400 p-1 mb-4"
            onClick={() => fileInputRef.current.click()}
          >
            {filePreview ? (
              <img
                src={filePreview}
                alt="Can't Upload"
                className="w-full h-auto max-h-[200px] object-cover rounded"
              />
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-center dark:text-gray-400">Click to</p>
                <Plus className="h-12 w-12 dark:text-gray-400 text-gray-700 mb-2" />
                <p className="text-center dark:text-gray-400">Add Photo</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>

          {/* ---------------------Company Name and Date-------------------- */}
          <div className="flex flex-col w-full">
            Company Name
            <Input
              placeholder="Enter Company's name"
              className={` bg-white dark:bg-black dark:border-gray-700 
          ${
            errors.company
              ? "border-red-500 dark:border-red-900"
              : "border-gray-300"
          }`}
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
        {/* ------------------------Other Inputs--------------------------- */}
        Job Title
        <Input
          placeholder="Enter Job Title"
          className={` bg-white dark:bg-black dark:border-gray-700 
          ${
            errors.title
              ? "border-red-500 dark:border-red-900 mb-0"
              : "border-gray-300 mb-4"
          }`}
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-700 text-xs mb-4">{errors.title.message}</p>
        )}
        Requirements
        <Textarea
          placeholder="Write about all the requirements for candidate..."
          className={`min-h-[100px] text-lg border-1 border-white bg-white
             dark:bg-black rounded-md dark:border-gray-700 
             ${
               errors.requirements
                 ? "border-red-500 dark:border-red-900 mb-0"
                 : "border-gray-300 mb-4"
             }`}
          {...register("requirements")}
        />
        {errors.requirements && (
          <p className="text-red-700 text-xs">{errors.requirements.message}</p>
        )}
        Job Location
        <Input
          placeholder="City or State, Country"
          className={`md:w-[70%] bg-white dark:bg-black dark:border-gray-700 
          ${
            errors.location
              ? "border-red-500 dark:border-red-900 mb-0"
              : "border-gray-300 mb-4"
          }`}
          {...register("location")}
        />
        {errors.location && (
          <p className="text-red-700 text-xs mb-4">{errors.location.message}</p>
        )}
        Salary offered
        <Input
          placeholder="Rupees or Yen in rough range"
          className={`md:w-[70%] bg-white dark:bg-black dark:border-gray-700 
          ${
            errors.salary
              ? "border-red-500 dark:border-red-900 mb-0"
              : "border-gray-300 mb-4"
          }`}
          {...register("salary")}
        />
        {errors.salary && (
          <p className="text-red-700 text-xs mb-4">{errors.salary.message}</p>
        )}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div>
            Email
            <Input
              placeholder="For job inquiries"
              className={`bg-white dark:bg-black dark:border-gray-700 
          ${
            errors.email
              ? "border-red-500 dark:border-red-900 mb-0"
              : "border-gray-300 mb-4"
          }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-700 text-xs mb-2">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            Mobile (Optional)
            <Input
              placeholder="10 digit number"
              className=" bg-white dark:bg-black dark:border-gray-700 "
              {...register("mobile")}
            />
            {errors.mobile && (
              <p className="text-red-700 text-xs mb-4">
                {errors.mobile.message}
              </p>
            )}
          </div>
        </div>
        Company Website
        <Input
          placeholder="Enter Company Website URL"
          className={`md:w-[70%] bg-white dark:bg-black dark:border-gray-700 
          ${
            errors.homepage
              ? "border-red-500 dark:border-red-900 mb-0"
              : "border-gray-300 mb-4"
          }`}
          {...register("homepage")}
        />
        {errors.homepage && (
          <p className="text-red-700 text-xs mb-4">{errors.homepage.message}</p>
        )}
        Job Description
        <div className="relative">
          <Textarea
            placeholder="Write a description/details about the job..."
            className={`min-h-[100px] text-lg border-1 border-white bg-white pr-10
             dark:bg-black rounded-md dark:border-gray-700 
             ${
               errors.jobDescription
                 ? "border-red-500 dark:border-red-900 mb-0"
                 : "border-gray-300 mb-4"
             }`}
            {...register("jobDescription")}
            ref={(e) => {
              register("jobDescription").ref(e);
              introEmoji.inputRef.current = e;
            }}
          />
          <div className="absolute bottom-0 right-2">
            <EmojiPickerButton
              onSelect={(emoji) =>
                introEmoji.insertEmoji({
                  emoji,
                  fieldName: "jobDescription",
                  getValues,
                  rhfSetValue: setValue,
                })
              }
              emojiSize={"h-8 w-8"}
            />
          </div>
        </div>
        {errors.jobDescription && (
          <p className="text-red-700 text-xs">
            {errors.jobDescription.message}
          </p>
        )}
        <div>
          <Button
            type="submit"
            className={`mt-4 w-80 cursor-pointer dark:border dark:border-gray-700 
           ${
             submitted
               ? "bg-green-600 text-white dark:bg-green-900"
               : "bg-black dark:text-gray-400 hover:bg-gray-900"
           }`}
            disabled={loading}
          >
            {loading ? "Posting..." : submitted ? feedback : "Post Job Now"}
          </Button>

          <p className="mb-2 mt-1 dark:text-gray-300 text-sm ml-2">
            You can Edit/Delete it anytime
          </p>
        </div>
      </form>
    </div>
  );
};

export default JobTrigger;
