"use client";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import userStore from "@/store/userStore";
import { useForm } from "react-hook-form";
import { useSchoolStore } from "@/store/useSchoolStore";

const EditSchool = ({ onClose, school }) => {
  const { user } = userStore();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const { updateSchoolZust } = useSchoolStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: school?.title || "",
      requirements: school?.requirements || "",
      location: school?.location || "",
      salary: school?.salary || "",
      email: school?.email || "",
      mobile: school?.mobile || "",
      schoolDescription: school?.schoolDescription || "",
    },
  });

  const handleEditSchool = async (data) => {
    try {
      await updateSchoolZust(school._id, data);
      onClose();
    } catch (error) {
      console.log("UpdateschoolHandler me error", error);
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
            Edit this School post {user?.username}
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

        {/* ------------------------School edit Form--------------------------- */}
        <form onSubmit={handleSubmit(handleEditSchool)}>
          School Title
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
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div>
              Email
              <Input
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
          School Description
          <Textarea
            className={`text-lg border-1 border-white bg-white
             dark:bg-black rounded-md dark:border-gray-700 
             ${
               errors.schoolDescription
                 ? "border-red-500 dark:border-red-900 mb-0"
                 : "border-gray-300 mb-4"
             }`}
            {...register("jobDescription")}
          />
          {errors.schoolDescription && (
            <p className="text-red-700 text-xs">
              {errors.schoolDescription.message}
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
export default EditSchool;
