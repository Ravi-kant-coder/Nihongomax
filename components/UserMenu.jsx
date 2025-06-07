"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, LogOutIcon } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const UserMenu = () => {
  const router = useRouter();
  const handleNavigation = (path, item) => {
    router.push(path);
  };
  const dunny = { imgsrc: "/Girl.jpg", username: "Phudu" };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="font-semibold  bg-white cursor-pointer font-[Poppins] hover:rounded-lg dark:hover:bg-white dark:bg-[rgb(36,37,38)] dark:text-white"
        >
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full text-lg cursor-pointer bg-white dark:text-black"
          >
            <Avatar>
              <AvatarImage
                className="object-cover"
                src={dunny?.imgsrc}
                alt={"byr"}
              />
              <AvatarFallback>
                {dunny?.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 z-50" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-column space-y-1">
              <div className="flex items-center">
                <Avatar className="cursor-pointer h-8 w-8 hover:ring-3 hover:ring-gray-600 hover:ring-offset-1 transition duration-100 mx-5">
                  <AvatarImage
                    src={dunny?.imgsrc}
                    alt={"byr"}
                    className="object-cover"
                  />

                  <AvatarFallback className="bg-pink-400 dark:bg-gray-500 text-xl">
                    {dunny?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="">
                  <p className="text-sm font-medium leading-none">
                    Ravi Kant Gupta
                  </p>
                  <p className="text-xs text-gray-600 mt-2 leading-none">
                    nihongomaxteam@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              handleNavigation("/user-profile");
            }}
          >
            <Users /> <span className="ml-2">My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              handleNavigation("/friends-list");
            }}
          >
            <MessageCircle /> <span className="ml-2">Messages</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <ThemeToggle />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <LogOutIcon /> <span className="ml-2">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
