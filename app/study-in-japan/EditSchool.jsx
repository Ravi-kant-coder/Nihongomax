"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import userStore from "@/store/userStore";
import { useForm } from "react-hook-form";
import { useSchoolStore } from "@/store/useSchoolStore";
import EmojiPickerButton from "../components/EmojiPickerButton";
import { useEmojiInsert } from "../hooks/useEmojiInsert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const EditSchool = ({ onClose, school }) => {
  const { user } = userStore();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const { updateSchoolZust } = useSchoolStore();
  const introEmoji = useEmojiInsert();
  const schoolSchema = yup.object().shape({
    intro: yup
      .string()
      .required("貴校の紹介は必須です")
      .min(10, "紹介は少なくとも10文字でなければなりません"),
    intakes: yup.string().required("回数は必須です"),
    location: yup.string().required("場所は必須です"),
  });
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schoolSchema),
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
  useEffect(() => {
    if (school) {
      reset({
        intro: school.intro || "",
        intakes: school.intakes || "",
        location: school.location || "",
        schoolDescription: school.schoolDescription || "",
      });
    }
  }, [school, reset]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="w-full md:w-2/3 dark:bg-[rgb(10,10,10)] p-2 md:p-4 rounded-lg max-h-[80vh] h-auto
      bg-[rgb(170,170,170)] lg:max-w-200 overflow-y-auto shadow-lg border border-gray-300 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-lg capitalize">
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
        <div>
          {/* ------------------------School edit Form--------------------------- */}
          <form onSubmit={handleSubmit(handleEditSchool)}>
            学校紹介
            <div className="relative ">
              <Textarea
                placeholder="貴校の説明を書いてください..."
                className={`min-h-[100px] text-lg border-1 border-white bg-whitedark:bg-black rounded-md
               dark:border-gray-700 bg-accent pr-10
               ${
                 errors.intro
                   ? "border-red-500 dark:border-red-900 mb-0"
                   : "border-gray-300 mb-4"
               }`}
                {...register("intro")}
                ref={(e) => {
                  register("intro").ref(e);
                  introEmoji.inputRef.current = e;
                }}
              />
              <div className="absolute bottom-0 right-2">
                <EmojiPickerButton
                  onSelect={(emoji) =>
                    introEmoji.insertEmoji({
                      emoji,
                      fieldName: "intro",
                      getValues,
                      rhfSetValue: setValue,
                    })
                  }
                  emojiSize={"h-8 w-8"}
                />
              </div>
            </div>
            {errors.intro && (
              <p className="text-red-700 text-xs mb-4">
                {errors.intro.message}
              </p>
            )}
            年間募集回数
            <Input
              className={`text-lg border-1 border-white bg-white md:w-[70%]
             dark:bg-black rounded-md dark:border-gray-700 
             ${
               errors.intakes
                 ? "border-red-500 dark:border-red-900 mb-0"
                 : "border-gray-300 mb-4"
             }`}
              {...register("intakes")}
            />
            {errors.intakes && (
              <p className="text-red-700 text-xs mb-4">
                {errors.intakes.message}
              </p>
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
            <div>
              <Button
                type="submit"
                className={`mt-4 w-80 cursor-pointer dark:border dark:border-gray-700 mb-4
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
    </div>
  );
};
export default EditSchool;
