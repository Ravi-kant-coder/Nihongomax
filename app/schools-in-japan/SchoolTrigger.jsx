"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import userStore from "@/store/userStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSchoolStore } from "@/store/useSchoolStore";
import MediaSlot from "./MediaSlot";

const schoolSchema = yup.object().shape({
  schoolName: yup.string().required("学校名は必須です"),
  intakes: yup.string().required("回数は必須です"),
  location: yup.string().required("場所は必須です"),
  homepage: yup.string().required("ホームページは必須です"),
  mobile: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .test(
      "valid-mobile",
      "10桁の携帯番号または固定電話番号を入力してください",
      (val) => {
        if (!val) return true; // ✅ allow empty
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(val);
      }
    ),

  email: yup
    .string()
    .required("メールは必須です")
    .test("valid-email", "Must be a valid email", (val) => {
      if (!val) return false;
      const emailRegex = /^\S+@\S+\.\S+$/;
      return emailRegex.test(val);
    }),
  schoolDescription: yup
    .string()
    .required("貴校の説明は必須です")
    .min(10, "説明は少なくとも10文字でなければなりません"),
});

const SchoolTrigger = () => {
  const { user } = userStore();
  const fileInputRef = useRef(null);
  const activeIndexRef = useRef(null);
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = today.toLocaleString("en-US", { month: "long" });
  const year = today.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  const { createSchoolZust, loading } = useSchoolStore();
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [mediaSlots, setMediaSlots] = useState(Array(4).fill(null));

  const formatFileSize = (bytes) => {
    if (!bytes) return "";

    const kb = bytes / 1024;
    if (kb < 1024) {
      return `${kb.toFixed(1)} KB`;
    }
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schoolSchema),
  });

  const handleSlotClick = (index) => {
    activeIndexRef.current = index;
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    setMediaSlots((prev) => {
      const updated = [...prev];
      updated[activeIndexRef.current] = {
        file,
        preview,
        type: file.type,
      };
      return updated;
    });
  };

  const hasTooLargeFile = mediaSlots.some((slot) => {
    if (!slot || !slot.file) return false;
    const sizeInMB = slot.file.size / (1024 * 1024);
    return sizeInMB > 2;
  });

  const cleanupPreviews = () => {
    mediaSlots.forEach((slot) => {
      if (slot?.preview) {
        URL.revokeObjectURL(slot.preview);
      }
    });
  };

  const onSubmit = async (data) => {
    try {
      const schoolData = new FormData();
      schoolData.append("schoolName", data.schoolName);
      schoolData.append("intakes", data.intakes);
      schoolData.append("intro", data.intro);
      schoolData.append("location", data.location);
      schoolData.append("homepage", data.homepage);
      schoolData.append("email", data.email);
      schoolData.append("mobile", data.mobile);
      schoolData.append("schoolDescription", data.schoolDescription);
      mediaSlots.forEach((slot) => {
        if (slot?.file) {
          schoolData.append("media", slot.file);
        }
      });
      await createSchoolZust(schoolData);
      reset();
      cleanupPreviews();
      setMediaSlots(Array(4).fill(null));
      setFeedback(
        `${user?.username?.split(" ")[0]}様、ご掲載ありがとうございました。`
      );
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Click Handler-Error School:", error);
    } finally {
      console.log("School submission process completed.");
    }
  };

  return (
    <div
      className="w-8/9 md:w-2/3 dark:bg-[rgb(10,10,10)] mb-10 p-2 md:p-4 rounded-lg
     bg-[rgb(170,170,170)] "
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 py-2">
          <Avatar>
            <AvatarImage className="object-cover" src={user?.profilePicture} />
            <AvatarFallback className="dark:bg-gray-800">
              {user?.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            掲載者
            <span className="text-gray-700 dark:text-gray-500 ml-1">
              ※非公開
            </span>
            <p className="font-semibold">{user?.username}</p>
          </div>
        </div>
        <p className="text-xs dark:text-gray-300">{formattedDate}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ------------------School Image/video 4 Upload media slots---------------------*/}
        <div
          className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 
        md:space-x-4 mb-4 md:justify-center"
        >
          {mediaSlots.map((slot, index) => (
            <MediaSlot
              key={index}
              slot={slot}
              filePreview={slot ? slot.preview : null}
              fileName={slot?.file ? slot.file.name : null}
              fileType={slot ? slot.type : null}
              formatFileSize={formatFileSize}
              fileSize={slot?.file ? slot.file.size : null}
              handleFileChange={handleFileChange}
              fileInputRef={fileInputRef}
              onClick={() => handleSlotClick(index)}
            />
          ))}{" "}
          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </div>
        {/* ---------------------School Name and Date-------------------- */}
        <div className="flex flex-col w-full">
          学校名
          <Input
            placeholder="貴校名を入力してください"
            className={` bg-white dark:bg-black dark:border-gray-700 
          ${
            errors.schoolName
              ? "border-red-500  dark:border-red-900 mb-0"
              : "border-gray-300 mb-4"
          }`}
            {...register("schoolName")}
          />
          {errors.schoolName && (
            <p className="text-red-700 text-xs mb-4">
              {errors.schoolName.message}
            </p>
          )}
        </div>
        {/* ------------------------Other Inputs--------------------------- */}
        年間募集回数
        <Input
          placeholder="年に何回どの時期に募集を入力してください"
          className={` bg-white dark:bg-black dark:border-gray-700 
          ${
            errors.intakes
              ? "border-red-500 dark:border-red-900 mb-0"
              : "border-gray-300 mb-4"
          }`}
          {...register("intakes")}
        />
        {errors.intakes && (
          <p className="text-red-700 text-xs mb-4">{errors.intakes.message}</p>
        )}
        学校紹介
        <Textarea
          placeholder="貴校の説明を書いてください..."
          className={`min-h-[100px] text-lg border-1 border-white bg-white
             dark:bg-black rounded-md dark:border-gray-700 
             ${
               errors.intro
                 ? "border-red-500 dark:border-red-900 mb-0"
                 : "border-gray-300 mb-4"
             }`}
          {...register("intro")}
        />
        {errors.intro && (
          <p className="text-red-700 text-xs">{errors.intro.message}</p>
        )}
        学校の場所
        <Input
          placeholder="区、市または州などを入力してください"
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
        ホームページ
        <Input
          placeholder="ホームページのURLを入力してください"
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
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div>
            問い合わせ用メール
            <Input
              placeholder="問い合わせ用メール"
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
          <div className="mb-4">
            <label className="block">
              電話番号（任意）
              <span className="text-xs dark:text-gray-400">
                日本国外の電話番号の場合は、備考欄などに記入ください。
              </span>
            </label>
            <div className="flex items-center gap-2">
              <span className="px-3 py-2 rounded-md bg-gray-300 dark:bg-gray-800 text-sm">
                +81
              </span>

              {/* Phone Number input */}
              <Input
                type="tel"
                inputMode="numeric"
                placeholder="ハイフンなし（例: 7012345678）"
                className="bg-white dark:bg-black dark:border-gray-700"
                {...register("mobile", {
                  setValueAs: (value) => value?.replace(/\D/g, ""), // remove dashes/spaces
                  validate: (value) => {
                    if (!value) return true; // optional field

                    // Mobile (70/80/90) or Landline (0X...)
                    const mobilePattern = /^(70|80|90)\d{8}$/;
                    const landlinePattern = /^0\d{8,9}$/;

                    return (
                      mobilePattern.test(value) ||
                      landlinePattern.test(value) ||
                      "日本の携帯番号または固定電話番号を入力してください"
                    );
                  },
                })}
              />
            </div>
            {errors.mobile && (
              <p className="text-red-700 text-xs mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>
        </div>
        学校詳細や入学案内など
        <Textarea
          placeholder="学校についてや入学手続きの詳細やコメント・備考などを軽く書いてください"
          className={`min-h-[100px] text-lg border-1 border-white bg-white
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
               ? "bg-green-600 text-black dark:bg-green-900 dark:text-white dark:font-normal"
               : "bg-black dark:text-gray-400 hover:bg-gray-900"
           }`}
            disabled={hasTooLargeFile || loading}
          >
            {loading ? "送信中..." : submitted ? feedback : "送信する"}
          </Button>
          <p className="mb-2 mt-1 dark:text-gray-300 text-sm ml-2">
            編集・削除はいつでも可能です。
          </p>
        </div>
      </form>
    </div>
  );
};

export default SchoolTrigger;
