"use client";
import { requireAuth } from "@/lib/requireAuth";
import { useTransition } from "react";
import userStore from "@/store/userStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Menu,
  TvMinimalPlay,
  School,
  BriefcaseBusiness,
  Dices,
  Handshake,
  BookOpen,
  Orbit,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Spinner from "../components/Spinner";
import useT from "./hooks/useT";
import useStudyStore from "@/store/useStudyStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserMenu = ({ handleLogout }) => {
  const { closeStudyBox } = useStudyStore();
  const { user } = userStore();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useT();

  const handleNavigation = (path) => {
    startTransition(() => {
      router.push(path);
    });
  };

  const pathname = usePathname();

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
                requireAuth(() => {
                  handleNavigation(`/user-profile/${user?._id}`);
                });
              }}
            >
              <div className="flex items-center">
                <Avatar className="cursor-pointer h-8 w-8 mr-4">
                  <AvatarImage
                    src={user?.profilePicture || "/fujisan.png"}
                    alt={user?.username || "Login/Create"}
                    className="object-cover"
                  />

                  <AvatarFallback className="dark:bg-gray-500 capitalize">
                    {user?.username
                      ? user.username.charAt(0).toUpperCase()
                      : "C/A"}
                  </AvatarFallback>
                </Avatar>

                <div className="w-[90%] truncate">
                  <p className="text-sm font-medium capitalize">
                    {user ? t("myProfile") : t("createAcc")}
                  </p>

                  <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                    {user?.username}
                  </p>
                </div>
              </div>
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* FRIENDS - LOGIN REQUIRED */}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              requireAuth(() => {
                handleNavigation("/friends");
              });
            }}
          >
            <Users />
            <span className="ml-2">
              <p>{t("friends")}</p>
            </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* VIDEOS - PUBLIC */}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              handleNavigation("/videos");
            }}
          >
            <TvMinimalPlay />
            <span className="ml-2">
              <p>{t("videos")}</p>
            </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* BLOGS - PUBLIC */}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              handleNavigation("/blogs");
            }}
          >
            <BriefcaseBusiness />
            <span className="ml-2">
              <p>{t("blogs")}</p>
            </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* STUDY IN JAPAN - LOGIN REQUIRED */}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              requireAuth(() => {
                handleNavigation("/study-in-japan");
              });
            }}
          >
            <School />
            <span className="ml-2">
              <p>{t("studyInJapan")}</p>
            </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* JOB APPLY - LOGIN REQUIRED */}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              requireAuth(() => {
                handleNavigation("/jobs");
              });
            }}
          >
            <Handshake />
            <span className="ml-2">
              <p>{t("jobApply")}</p>
            </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* GAME - PUBLIC */}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              handleNavigation("/games");
            }}
          >
            <Dices />
            <span className="ml-2">
              <p>{t("game")}</p>
            </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* JLPT QUIZ - PUBLIC */}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              handleNavigation("/jlpt-quiz");
            }}
          >
            <Orbit />
            <span className="ml-2">
              <p>{t("quiz")}</p>
            </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* NOTES - LOGIN REQUIRED */}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              requireAuth(() => {
                handleNavigation("/notes");
              });
            }}
          >
            <BookOpen />
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
