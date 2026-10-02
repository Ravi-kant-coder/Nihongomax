"use client";
import { requireAuth } from "@/lib/requireAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useT from "./hooks/useT";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

const StoryTriggerPseudo = () => {
  const t = useT();
  const router = useRouter();

  return (
    <div
      className="shadow-md shadow-gray-400 dark:shadow-[rgb(20,20,20)] dark:bg-[rgb(45,45,45)] rounded-lg
    2xl:w-30 2xl:h-50 md:w-25 md:h-45 w-20 h-40"
      onClick={() =>
        requireAuth(() => {
          router.push("/");
        })
      }
    >
      <div
        className="relative w-full h-full cursor-pointer rounded-lg overflow-hidden bg-white dark:bg-[rgb(36,37,38)] 
              shadow-sm hover:shadow-md hover:scale-[1.02] transition-transform duration-200 ease-in-out"
      >
        <div className="relative h-[100px] md:h-[110px] lg:h-[120px] xl:h-[120px] 2xl:h-[140px] w-full overflow-hidden">
          <Avatar className="h-full w-full rounded-none">
            <AvatarImage
              src={"/fujisan.png"}
              alt={"C/A"}
              className="object-cover h-full w-full "
            />
            <AvatarFallback className="bg-gray-300 dark:bg-black capitalize text-4xl">
              {"C/A"}
            </AvatarFallback>
          </Avatar>
        </div>
        <div
          className="absolute left-1/2 top-[85px] md:top-[100px] 2xl:top-[120px] -translate-x-1/2 w-9 h-9 md:w-10 md:h-10
               bg-gray-500 rounded-full flex items-center justify-center border-4 border-white dark:border-[rgb(36,37,38)]"
        >
          <Plus className="text-white w-5 h-5" />
        </div>
        <div className="py-4 text-center border-t border-gray-200 dark:border-[rgb(58,59,60)]">
          <p className="font-[450] text-black dark:text-white text-xs md:text-sm capitalize 2xl:text-sm">
            {t("createAcc")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryTriggerPseudo;
