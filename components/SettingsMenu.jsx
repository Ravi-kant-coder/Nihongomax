import { LucideLogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";

const SettingsMenu = () => {
  return (
    <motion.div
      whileHover={{ x: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <DropdownMenuLabel
            className="shadow-lg border-gray-400 border-1 rounded-lg cursor-pointer font-[Poppins] bg-gray-200 hover:bg-gray-300 dark:hover:bg-black dark:bg-[rgb(36,37,38)] dark:text-white"
            style={{ fontWeight: "600" }}
          >
            <div className="flex items-center ">
              <Avatar className="h-8 w-8 m-2">
                {false ? (
                  <AvatarImage />
                ) : (
                  <AvatarFallback className="bg-gray-400 dark:bg-gray-600 hover:bg-gray-100">
                    M
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="leading-none">{"Monica Sharma"}</p>
                <p className="text-xs mt-2 text-gray-800 dark:text-white leading-none">
                  {"moincaSharma1983@gmail.com"}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60 z-110" align="end">
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2" />
            <span>Edit My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            {<ThemeToggle />}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <LucideLogOut className="mr-2" />
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
};

export default SettingsMenu;
