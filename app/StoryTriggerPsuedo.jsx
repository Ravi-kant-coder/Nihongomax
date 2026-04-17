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
      className="shadow-md shadow-gray-400 dark:shadow-[rgb(20,20,20)] md:w-30 h-50 w-20 dark:bg-[rgb(45,45,45)] rounded-lg"
      onClick={() =>
        requireAuth(() => {
          router.push("/");
        })
      }
    >
      <div
        className="relative w-full h-full cursor-pointer rounded-lg overflow-hidden bg-white dark:bg-[rgb(36,37,38)] 
              shadow-sm hover:shadow-md hover:scale-[1.02] transition-transform
"
      >
        <div className="relative h-[140] w-full overflow-hidden">
          <Avatar className="h-full w-full rounded-none">
            <AvatarImage
              src={"/fujisan.png"}
              alt={"C/A"}
              className="object-cover"
            />
            <AvatarFallback className="bg-gray-300 dark:bg-black capitalize text-4xl">
              {"C/A"}
            </AvatarFallback>
          </Avatar>
        </div>
        <div
          className="absolute left-1/2 top-[115] -translate-x-1/2 w-10 h-10 bg-gray-500 rounded-full 
                flex items-center justify-center border-4 border-white dark:border-[rgb(36,37,38)]"
        >
          <Plus className="text-white w-5 h-5" />
        </div>
        <div className="py-4 text-center border-t border-gray-200 dark:border-[rgb(58,59,60)]">
          <p className="text-sm font-[450] text-black dark:text-white">
            {t("createAcc")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryTriggerPseudo;
