import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
const SearchInNav = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <form>
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="pl-8 cursor-pointer dark:bg-[rgb(75,75,75)] bg-white rounded-full"
          placeholder="Search Friends..."
          type="text"
        />
        <div>
          {isSearchOpen && (
            <div className="absolute top-full w-full left-0 bg-gray-400 dark:bg-gray-800 border border-gray200 dark:border-gray-700 rounded-md shadow-lg mt-1 z-50">
              <div className="p-2">
                <div className="flex flex-center space-x-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                  <Search className="absolute text-sm text-gray-600" />
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage />
                      <AvatarFallback>Z</AvatarFallback>
                    </Avatar>
                    <span>Ravi</span>
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
