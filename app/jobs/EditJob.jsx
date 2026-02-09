"use client";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import userStore from "@/store/userStore";
import { useForm } from "react-hook-form";
import { useJobStore } from "@/store/useJobStore";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import EmojiPickerButton from "../components/EmojiPickerButton";
import { useEmojiInsert } from "../hooks/useEmojiInsert";

const jobSchema = yup.object().shape({
  title: yup.string().required("Job title is required"),
  jobDescription: yup
    .string()
    .required("Job description is required")
    .min(10, "Description must be at least 10 characters"),
});

const EditJob = ({ onClose, job }) => {
  const { user } = userStore();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const { updateJobZust } = useJobStore();
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
    defaultValues: {
      title: job?.title || "",
      requirements: job?.requirements || "",
      location: job?.location || "",
      salary: job?.salary || "",
      jobDescription: job?.jobDescription || "",
    },
  });

  const handleEditJob = async (data) => {
    try {
      await updateJobZust(job._id, data);
      onClose();
    } catch (error) {
      console.log("UpdateJobHandler error", error);
    }
  };

  return (
    <div
      className="w-8/9 md:w-2/3 dark:bg-[rgb(10,10,10)] p-2 md:p-4 rounded-lg
     bg-[rgb(170,170,170)] lg:max-w-200 fixed inset-0 z-50 m-auto overflow-y-auto
     shadow-lg border border-gray-300 dark:border-gray-700 h-160"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="font-semibold dark:font-normal text-lg">
            Edit this Job post {user?.username}
          </p>
          <button
            onClick={onClose}
            className="bg-[rgba(23,23,23,0.5)] dark:bg-[rgb(0,30,30)]
            hover:bg-black text-white p-1 mr-4
            dark:hover:bg-black cursor-pointer border-2 border-white/80 
            dark:border-[rgb(200,200,200)] rounded-lg top-1 z-50"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* ------------------------Job edit Form--------------------------- */}
        <form onSubmit={handleSubmit(handleEditJob)}>
          Job Title
          <Input
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
            className={`text-lg border-1 border-white bg-white
             dark:bg-black rounded-md dark:border-gray-700 
             ${
               errors.requirements
                 ? "border-red-500 dark:border-red-900 mb-0"
                 : "border-gray-300 mb-4"
             }`}
            {...register("requirements")}
          />
          {errors.requirements && (
            <p className="text-red-700 text-xs">
              {errors.requirements.message}
            </p>
          )}
          Job Location
          <Input
            className={`md:w-[70%] bg-white dark:bg-black dark:border-gray-700 
          ${
            errors.location
              ? "border-red-500 dark:border-red-900 mb-0"
              : "border-gray-300 mb-4"
          }`}
            {...register("location")}
          />
          {errors.location && (
            <p className="text-red-700 text-xs mb-4">
              {errors.location.message}
            </p>
          )}
          Salary offered
          <Input
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
          Job Description
          <div className="relative">
            <Textarea
              className={`text-lg border-1 border-white bg-white pr-10
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
               ? "bg-green-300 hover:bg-green-300 text-black dark:bg-green-950 dark:text-white dark:hover:bg-green-950"
               : "bg-black dark:text-gray-400 hover:bg-gray-900"
           }`}
              disabled={loading}
            >
              {loading ? "Saving..." : submitted ? feedback : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditJob;
