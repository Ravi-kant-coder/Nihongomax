"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MessageCircle, LogOutIcon, User2 } from "lucide-react";
import { useTransition } from "react";
import userStore from "@/store/userStore";
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
import Spinner from "./Spinner";
import useT from "./hooks/useT";

const UserMenu = ({ handleLogout }) => {
  const { user } = userStore();
  const [isPending, startTransition] = useTransition();
  const t = useT();
  const router = useRouter();
  const handleNavigation = (path) => {
    startTransition(() => {
      router.push(path);
    });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="font-semibold md:ml-20 cursor-pointer border 
          border-gray-400 rounded-full"
        >
          <div className="relative cursor-pointer md:scale-150">
            <Avatar>
              <AvatarImage
                src={user?.profilePicture}
                className="object-cover"
              />
              <AvatarFallback className="dark:bg-black text-sm">
                {user?.username?.charAt(0).toUpperCase()}
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
                    src={user?.profilePicture}
                    alt={user?.username}
                    className="object-cover"
                  />

                  <AvatarFallback className="dark:bg-gray-500">
                    {user?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="w-[70%]">
                  <p className="text-sm font-medium truncate">
                    {user?.username}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              handleNavigation(`/user-profile/${user?._id}`);
            }}
          >
            <User2 />{" "}
            <span className="ml-2">
              <p>{t("myProfile")}</p>
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              handleNavigation("/friends");
            }}
          >
            <Users />{" "}
            <span className="ml-2">
              <p>{t("friends")}</p>
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              handleNavigation("/messages");
            }}
          >
            <MessageCircle />{" "}
            <span className="ml-2">
              <p>{t("msgs")}</p>
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer">
            <ThemeToggle />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              handleLogout();
            }}
          >
            <LogOutIcon />{" "}
            <span className="ml-2">
              <p>{t("logout")}</p>
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isPending && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-white/60
           dark:bg-black/60 backdrop-blur-sm z-[9999] transition-opacity duration-300 
           opacity-100"
        >
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
