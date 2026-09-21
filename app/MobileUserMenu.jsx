"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Menu,
  LogOutIcon,
  User2,
  TvMinimalPlay,
  Home,
  School,
  BriefcaseBusiness,
  Dices,
  Handshake,
  ChartNoAxesCombined,
  BookOpen,
  Orbit,
} from "lucide-react";
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
import Spinner from "../components/Spinner";
import useT from "./hooks/useT";
import useStudyStore from "@/store/useStudyStore";

const UserMenu = ({ handleLogout }) => {
  const { closeStudyBox } = useStudyStore();
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
        <DropdownMenuTrigger asChild className="font-semibold cursor-pointer">
          <div className="relative flex flex-col items-center justify-center">
            <Menu className="w-5 h-5" />
            <p className="mt-1">Menu</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 z-200" align="end">
          <DropdownMenuItem className="font-normal cursor-pointer">
            <div
              className="flex flex-column"
              onClick={() => {
                handleNavigation(`/user-profile/${user?._id}`);
              }}
            >
              <div className="flex items-center">
                <Avatar className="cursor-pointer h-8 w-8 mr-4">
                  <AvatarImage
                    src={user?.profilePicture}
                    alt={user?.username}
                    className="object-cover"
                  />

                  <AvatarFallback className="dark:bg-gray-500 capitalize">
                    {user?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="w-[70%] truncate">
                  <p className="text-sm font-medium capitalize">
                    {user?.username}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
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
              handleNavigation("/videos");
            }}
          >
            <TvMinimalPlay />{" "}
            <span className="ml-2">
              <p>{t("videos")}</p>
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              handleNavigation("/blogs");
            }}
          >
            <BriefcaseBusiness />{" "}
            <span className="ml-2">
              <p>{t("blogs")}</p>
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              handleNavigation("/study-in-japan");
            }}
          >
            <School />{" "}
            <span className="ml-2">
              <p>{t("studyInJapan")}</p>
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              handleNavigation("/jobs");
            }}
          >
            <School />{" "}
            <span className="ml-2">
              <p>{t("jobApply")}</p>
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              handleNavigation("/games");
            }}
          >
            <Dices />{" "}
            <span className="ml-2">
              <p>{t("game")}</p>
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              handleNavigation("/jlpt-quiz");
            }}
          >
            <Orbit />{" "}
            <span className="ml-2">
              <p>{t("quiz")}</p>
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              handleNavigation("/notes");
            }}
          >
            <BookOpen />{" "}
            <span className="ml-2">
              <p>{t("notes")}</p>
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
