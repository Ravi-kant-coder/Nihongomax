"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MessageCircle, LogOutIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/app/ThemeToggle";

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
          className="font-semibold md:ml-20 cursor-pointer border  border-gray-400 rounded-full"
        >
          <div className="relative cursor-pointer ">
            <Avatar>
              <AvatarImage
                className="object-cover "
                src={dunny?.imgsrc}
                alt={"byr"}
              />
              <AvatarFallback className="dark:bg-black">
                {dunny?.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 z-200" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-column">
              <div className="flex items-center">
                <Avatar className="cursor-pointer h-8 w-8 mr-4">
                  <AvatarImage
                    src={dunny?.imgsrc}
                    alt={"byr"}
                    className="object-cover"
                  />

                  <AvatarFallback className="dark:bg-gray-500 text-xl">
                    {dunny?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="w-[70%]">
                  <p className="text-sm font-medium ">Ravi Kant Gupta</p>
                  <p className="text-xs text-gray-600">nihongomax@gmail.com</p>
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
              handleNavigation("/friends");
            }}
          >
            <MessageCircle /> <span className="ml-2">Friends</span>
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
