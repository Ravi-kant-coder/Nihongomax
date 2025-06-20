"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
const SearchInNav = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <form>
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="pl-8 cursor-pointer w-full dark:bg-[rgb(75,75,75)] bg-white rounded-full"
          placeholder="Search Friends..."
          type="text"
        />
        <div>
          {isSearchOpen && (
            <div className="absolute top-full w-full left-0 bg-gray-400 dark:bg-gray-800 border border-gray200 dark:border-gray-700 rounded-md shadow-lg mt-1 z-50">
              <div className="p-2">
                <div className="flex flex-center space-x-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                  <div className="flex items-center gap-2 ">
                    <Avatar>
                      <AvatarImage />
                      <AvatarFallback className="text-black">R</AvatarFallback>
                    </Avatar>
                    <span>Ravi kant gupta</span>
                  </div>
                </div>
                <div className="flex flex-center space-x-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                  <div className="flex items-center gap-2 ">
                    <Avatar>
                      <AvatarImage />
                      <AvatarFallback className="text-black">R</AvatarFallback>
                    </Avatar>
                    <span>Ravi kant gupta</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default SearchInNav;
