"use client";
import { requireAuth } from "@/lib/requireAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useT from "./hooks/useT";
import { useRouter } from "next/navigation";
import { Clapperboard, SmilePlus } from "lucide-react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Input } from "@/components/ui/input";

const PostTriggerPsuedo = () => {
  const t = useT();
  const router = useRouter();

  return (
    <div
      className="lg:mb-2 shadow-md shadow-gray-400 dark:shadow-black w-full p-4 flex cursor-pointer justify-between items-center
      bg-white dark:bg-[rgb(45,45,45)] rounded-xl"
      onClick={() =>
        requireAuth(() => {
          router.push("/");
        })
      }
    >
      <Avatar className="h-9 w-9 mr-1">
        <AvatarImage className="object-cover" src={"/fujisan.png"} />
        <AvatarFallback className="bg-gray-300 dark:bg-gray-500 hover:bg-gray-300 dark:text-white">
          {"C/A"}
        </AvatarFallback>
      </Avatar>
      <div className="flex items-center w-full relative">
        <Input
          placeholder={`${t("ask")}`}
          readOnly
          className="rounded-xl border-1 border-gray-300 dark:border-gray-500 cursor-pointer h-10 dark:bg-[rgb(75,75,75)]"
        />
        <SmilePlus className=" absolute right-0 h-6 w-6 text-yellow-500 mr-2" />
      </div>
      <div className="flex justify-center items-center">
        <div className="ml-1 p-2 cursor-pointer rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-black dark:text-white">
          <PhotoIcon className="h-5 w-5 text-green-600 mr-1" />
          <span className="hidden md:flex whitespace-nowrap">
            {t("photos")}
          </span>
        </div>
        <div className=" p-2 hover:bg-gray-200 cursor-pointer rounded-lg flex items-center justify-center dark:hover:bg-black dark:text-white">
          <Clapperboard className="h-5 w-5 text-red-600 mr-1" shrink={0} />
          <span className="hidden md:flex whitespace-nowrap">
            {t("videos")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostTriggerPsuedo;
