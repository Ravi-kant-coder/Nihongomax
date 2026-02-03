"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
  } = useForm({
    defaultValues: {
      intro: school?.intro || "",
      intakes: school?.intakes || "",
      location: school?.location || "",
      schoolDescription: school?.schoolDescription || "",
    },
  });

  const handleEditSchool = async (data) => {
    try {
      await updateSchoolZust(school._id, data);
      onClose();
    } catch (error) {
      console.log("UpdateschoolHandler error", error);
    }
  };

  return (
    <div
      className="w-8/9 md:w-2/3 dark:bg-[rgb(10,10,10)] p-2 md:p-4 rounded-lg
     bg-[rgb(170,170,170)] lg:max-w-200 fixed inset-0 z-50 m-auto overflow-y-auto
     shadow-lg border border-gray-300 dark:border-gray-700 h-150"
    >
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-lg">
              {user?.username}様、基本情報編集は可能です。{" "}
            </p>
            <p className="text-sm text-red-900 dark:text-red-600">
              貴校名や連絡先などは編集不可です。{" "}
            </p>
          </div>
          <button
            onClick={onClose}
            className="bg-[rgba(23,23,23,0.5)] dark:bg-[rgb(40,40,40)]
            hover:bg-black text-white p-1 mr-4 dark:hover:bg-[rgb(60,60,60)] cursor-pointer  
             rounded-lg top-1 z-50"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* ------------------------School edit Form--------------------------- */}
        <form onSubmit={handleSubmit(handleEditSchool)}>
          学校紹介
          <Input
            className={` bg-white dark:bg-black dark:border-gray-700 
          ${
            errors.intro
              ? "border-red-500 dark:border-red-900 mb-0"
              : "border-gray-300 mb-4"
          }`}
            {...register("intro")}
          />
          {errors.intro && (
            <p className="text-red-700 text-xs mb-4">{errors.intro.message}</p>
          )}
          年間募集回数
          <Textarea
            className={`text-lg border-1 border-white bg-white
             dark:bg-black rounded-md dark:border-gray-700 
             ${
               errors.intakes
                 ? "border-red-500 dark:border-red-900 mb-0"
                 : "border-gray-300 mb-4"
             }`}
            {...register("intakes")}
          />
          {errors.intakes && (
            <p className="text-red-700 text-xs">{errors.intakes.message}</p>
          )}
          学校の場所
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
          学校詳細や入学案内など
          <Textarea
            className={`text-lg border-1 border-white bg-white
             dark:bg-black rounded-md dark:border-gray-700 
             ${
               errors.schoolDescription
                 ? "border-red-500 dark:border-red-900 mb-0"
                 : "border-gray-300 mb-4"
             }`}
            {...register("schoolDescription")}
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
              {loading ? "送信中..." : submitted ? feedback : "送信"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditSchool;
