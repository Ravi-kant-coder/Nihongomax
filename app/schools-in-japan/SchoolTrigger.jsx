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
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EmojiPickerButton from "../components/EmojiPickerButton";
import { useEmojiInsert } from "../hooks/useEmojiInsert";
import { formatJapaneseDate } from "@/lib/utils";

const schoolSchema = yup.object().shape({
  schoolName: yup.string().required("学校名は必須です"),
  intro: yup
    .string()
    .required("貴校の紹介は必須です")
    .min(10, "紹介は少なくとも10文字でなければなりません"),
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
        if (!val) return true; // allow empty
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(val);
      },
    ),
  email: yup
    .string()
    .required("メールは必須です")
    .test("valid-email", "Must be a valid email", (val) => {
      if (!val) return false;
      const emailRegex = /^\S+@\S+\.\S+$/;
      return emailRegex.test(val);
    }),
});

const SchoolTrigger = () => {
  const { user } = userStore();
  const fileInputRef = useRef(null);
  const activeIndexRef = useRef(null);
  const { createSchoolZust, loading } = useSchoolStore();
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [visibility, setVisibility] = useState("false");
  const introEmoji = useEmojiInsert();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schoolSchema),
  });
  // ------------------School Media slots state---------------------
  const maxSlots = 4;
  const [mediaSlots, setMediaSlots] = useState(
    Array.from({ length: maxSlots }, () => null),
  );

  const [visibleSlots, setVisibleSlots] = useState(1);

  const handleAddMoreSlot = () => {
    setVisibleSlots((prev) => Math.min(prev + 1, maxSlots));
  };

  const handleRemoveSlot = (index) => {
    setMediaSlots((prev) => {
      const updated = [...prev];

      for (let i = index; i < maxSlots - 1; i++) {
        updated[i] = updated[i + 1];
      }

      updated[maxSlots - 1] = null;
      return updated;
    });

    setVisibleSlots((prev) => Math.max(prev - 1, 1));
  };

  const canAddMore =
    visibleSlots < maxSlots && mediaSlots[visibleSlots - 1] !== null;

  const formatFileSize = (bytes) => {
    if (!bytes) return "";

    const kb = bytes / 1024;
    if (kb < 1024) {
      return `${kb.toFixed(1)} KB`;
    }
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

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
    return sizeInMB > 4;
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
      schoolData.append("visibility", visibility);
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
      setVisibleSlots(1);
      setFeedback(
        `${user?.username?.split(" ")[0]}様、ご掲載ありがとうございました。`,
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
     bg-[rgb(170,170,170)]"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="flex items-center space-x-3 py-2 mr-4">
            <Avatar>
              <AvatarImage
                className="object-cover"
                src={user?.profilePicture}
              />
              <AvatarFallback className="dark:bg-gray-800">
                {user?.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              掲載者
              <p className="font-semibold capitalize">{user?.username}</p>
            </div>
          </div>
          <Select
            value={visibility}
            onValueChange={(value) => setVisibility(value)}
          >
            <SelectTrigger className="w-[150px] border border-gray-600 text-gray-700 dark:border-gray-400 dark:text-gray-400">
              <SelectValue placeholder="公開設定" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="false">お名前非公開</SelectItem>
              <SelectItem value="true">お名前公開</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm dark:text-gray-300">{formatJapaneseDate()}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ------------------School Image/video 4 Upload media slots---------------------*/}
        <div
          className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 
        md:space-x-4 mb-4 md:justify-start"
        >
          <AnimatePresence>
            {mediaSlots.slice(0, visibleSlots).map((slot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative"
              >
                {slot && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSlot(index)}
                    className="absolute -top-2 right-0 z-10 w-6 h-6 rounded-full bg-black/70 text-white 
                     flex items-center justify-center text-sm hover:bg-black cursor-pointer"
                  >
                    ✕
                  </button>
                )}
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
                  slotBorderSize="border-2"
                />
              </motion.div>
            ))}
          </AnimatePresence>
          {canAddMore && (
            <motion.button
              type="button"
              onClick={handleAddMoreSlot}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.8 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="w-[120px] flex flex-col items-center justify-center cursor-pointer
              border border-white rounded-xl text-white hover:border-gray-700 hover:text-gray-700
               dark:hover:border-white dark:hover:text-white"
            >
              <span className="text-4xl">+</span>
              <span className="text-sm ">アップロード</span>
              <span className="text-sm ">もっと</span>
            </motion.button>
          )}
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
        {/* ------------------------School Intro--------------------------- */}
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
          <p className="text-red-700 text-xs">{errors.intro.message}</p>
        )}
        {/* ------------------------Intakes--------------------------- */}
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
        {/* ------------------------Location--------------------------- */}
        学校の場所
        <Input
          placeholder="区、市、州など"
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
        {/* ------------------------Website--------------------------- */}
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
        {/* ------------------------E-mail--------------------------- */}
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
          {/* ------------------------Phone--------------------------- */}
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
        <Button
          type="submit"
          className={`mt-4 w-80 cursor-pointer dark:border dark:border-gray-700 
           ${
             submitted
               ? "bg-green-800 hover:bg-green-800"
               : "bg-black dark:text-gray-400 hover:bg-gray-900"
           }`}
          disabled={hasTooLargeFile || loading}
        >
          {loading ? (
            "送信中..."
          ) : submitted ? (
            <span className="text-white">{feedback}</span>
          ) : (
            "送信する"
          )}
        </Button>
        <p className="mb-2 mt-1 dark:text-gray-300 text-sm ml-2">
          編集・削除はいつでも可能です。
        </p>
      </form>
    </div>
  );
};

export default SchoolTrigger;
