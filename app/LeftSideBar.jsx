"use client";
import { requireAuth } from "@/lib/requireAuth";
import { useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userStore from "@/store/userStore";
import FriendsNotification from "./FriendsNotification";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Spinner from "../components/Spinner";
import useT from "./hooks/useT";
import {
  Home,
  Users,
  School,
  BriefcaseBusiness,
  Dices,
  Handshake,
  ChartNoAxesCombined,
  TvMinimalPlay,
  Building2,
  BookOpen,
} from "lucide-react";

const LeftSideBar = () => {
  const { user } = userStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleNavigation = (path) => {
    startTransition(() => {
      router.push(path);
    });
  };
  const pathname = usePathname();
  const t = useT();

  return (
    <>
      <aside className="fixed h-full hidden md:p-1 md:flex flex-col z-50 md:z-0 md:mt-20 p-2 md:w-1/6 overflow-y-auto scroll-smooth overscroll-contain md:ml-2">
        <nav className="space-y-3 h-full flex flex-col overflow-y-auto">
          <div
            onClick={() =>
              requireAuth(() => {
                handleNavigation(`/user-profile/${user?._id}`);
              })
            }
            className="flex items-center group space-x-2 cursor-pointer hover:shadow-lg dark:bg-[rgb(55,55,55)] rounded-md p-2 bg-white mb-4 
             dark:hover:bg-[rgb(65,65,65)]"
          >
            {" "}
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarImage
                className="object-cover"
                src={user?.profilePicture || "/fujisan.png"}
              />
              <AvatarFallback className="bg-gray-400 dark:bg-black dark:text-white">
                {user?.username ? user.username.charAt(0).toUpperCase() : "C/A"}
              </AvatarFallback>
            </Avatar>
            <div className="max-w-200px">
              <div className="font-[450] capitalize">
                {user ? <p>{t("myProfile")}</p> : <p>{t("createAcc")}</p>}
              </div>
              <div className="capitalize text-xs truncate w-full">
                {user?.username}
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`w-full cursor-pointer dark:font-normal ${
              pathname === "/"
                ? "bg-white dark:bg-[rgb(55,55,55)] shadow-lg"
                : "bg-transparent"
            } dark:hover:bg-[rgb(55,55,55)]  hover:bg-white text-sm font-semibold flex items-center bg- justify-start p-2 rounded-md hover:shadow-lg`}
            onClick={() => {
              handleNavigation("/");
            }}
          >
            <div className="relative">
              <div className="flex items-center">
                <Home className="mr-4 w-6 h-6" />
                <p>{t("home")}</p>
              </div>
            </div>
          </motion.button>
          <motion.button
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`w-full cursor-pointer dark:font-normal ${
              pathname === "/friends"
                ? "bg-white dark:bg-[rgb(55,55,55)] shadow-lg"
                : "bg-transparent"
            } dark:hover:bg-[rgb(55,55,55)]  hover:bg-white text-sm font-semibold flex items-center bg- justify-start p-2 rounded-md hover:shadow-lg relative`}
            onClick={() =>
              requireAuth(() => {
                handleNavigation("/friends");
              })
            }
          >
            <div className="flex items-center">
              <Users className="mr-4 w-6 h-6" />
              <p>{t("friends")}</p>
            </div>
            {user && <FriendsNotification />}
          </motion.button>
          {[
            {
              id: 2,
              label: <p>{t("videos")}</p>,
              navPath: "/videos",
              icon: TvMinimalPlay,
              isProtected: false,
            },
            {
              id: 3,
              label: <p>{t("blogs")}</p>,
              navPath: "/blogs",
              icon: BriefcaseBusiness,
              isProtected: false,
            },
            {
              id: 4,
              label: <p>{t("studyInJapan")}</p>,
              navPath: "/study-in-japan",
              icon: School,
              isProtected: true,
            },
            {
              id: 5,
              label: <p>{t("notes")}</p>,
              navPath: "/notes",
              icon: BookOpen,
              isProtected: true,
            },
            {
              id: 6,
              label: <p>{t("game")}</p>,
              navPath: "/games",
              icon: Dices,
              isProtected: false,
            },
            {
              id: 7,
              label: <p>{t("jobApply")}</p>,
              navPath: "/jobs",
              icon: Handshake,
              isProtected: true,
            },
            {
              id: 8,
              label: <p>{t("recruiters")}</p>,
              navPath: "/recruiters",
              icon: ChartNoAxesCombined,
              isProtected: true,
            },
            {
              id: 1,
              label: <p>{t("schools")}</p>,
              navPath: "/schools-in-japan",
              icon: Building2,
              isProtected: true,
            },
          ].map(({ id, label, icon: Icon, navPath, isProtected }) => {
            const isActive = pathname === navPath;
            return (
              <motion.button
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-full cursor-pointer dark:font-normal ${
                  isActive
                    ? "bg-white dark:bg-[rgb(55,55,55)] shadow-lg"
                    : "bg-transparent"
                } dark:hover:bg-[rgb(55,55,55)]  hover:bg-white text-sm font-semibold flex items-center bg- justify-start p-2 rounded-md hover:shadow-lg`}
                onClick={() => {
                  if (isProtected) {
                    requireAuth(() => {
                      handleNavigation(navPath);
                    });
                  } else {
                    handleNavigation(navPath);
                  }
                }}
                key={id}
              >
                <Icon className="mr-4 w-6 h-6" />
                {label}
              </motion.button>
            );
          })}
        </nav>
      </aside>
      {isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 dark:bg-black/60 backdrop-blur-xs z-9999">
          <Spinner />
        </div>
      )}
    </>
  );
};
export default LeftSideBar;
