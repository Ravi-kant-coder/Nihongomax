"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import useT from "@/app/hooks/useT";
import { requireAuth } from "@/lib/requireAuth";
import { useRouter } from "next/navigation";

const SearchBarPseudo = () => {
  const t = useT();
  const router = useRouter();

  return (
    <div className="md:mr-5">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="pl-8 cursor-pointer w-full dark:bg-[rgb(75,75,75)] bg-white rounded-full"
          placeholder={`${t("search")}`}
          onClick={() =>
            requireAuth(() => {
              router.push("/");
            })
          }
        />
      </div>
    </div>
  );
};

export default SearchBarPseudo;
