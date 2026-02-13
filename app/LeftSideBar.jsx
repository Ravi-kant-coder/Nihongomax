"use client";
import { useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userStore from "@/store/userStore";
import {
  Bell,
  Home,
  MessageCircle,
  Users,
  School,
  BriefcaseBusiness,
  Dices,
  Handshake,
  ChartNoAxesCombined,
  TvMinimalPlay,
  Building2,
  BookOpen,
  PlusCircle,
} from "lucide-react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import useMsgStore from "@/store/useMsgStore";
import useNotificationStore from "@/store/useNotificationStore";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Spinner from "./Spinner";
import useT from "./hooks/useT";

const LeftSideBar = () => {
  const { user } = userStore();
  const {
    isMsgBoxOpen,
    toggleMsgBox,
    closeMsgBox,
    incrementUnread,
    unreadCount,
    resetUnread,
  } = useMsgStore();
  const {
    toggleNotificationBox,
    isNotificationBoxOpen,
    closeNotificationBox,
    incrementNotification,
    unreadNotificationCount,
  } = useNotificationStore();

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
      <aside
        className="fixed h-full hidden md:p-1 md:flex flex-col z-50 md:z-0 md:mt-20 p-2 md:w-1/6 overflow-y-auto 
      scroll-smooth overscroll-contain md:ml-2"
      >
        <nav className="space-y-3 flex-grow h-full flex flex-col overflow-y-auto">
          <div
            onClick={() => {
              handleNavigation(`/user-profile/${user?._id}`);
              closeMsgBox();
              closeNotificationBox();
            }}
            className="flex items-center group space-x-2 cursor-pointer hover:shadow-lg
             dark:bg-[rgb(55,55,55)] rounded-md p-2 bg-white mb-4 
             dark:hover:bg-[rgb(65,65,65)]"
          >
            {" "}
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarImage
                className="object-cover"
                src={user?.profilePicture}
              />
              <AvatarFallback className="bg-gray-400 dark:bg-black dark:text-white">
                {user?.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="max-w-[200px]">
              <div className="font-[450] capitalize">
                <p>{t("myProfile")}</p>
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
            } dark:hover:bg-[rgb(55,55,55)]  hover:bg-white text-sm font-semibold
             flex items-center bg- justify-start p-2 rounded-md hover:shadow-lg`}
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
            } dark:hover:bg-[rgb(55,55,55)]  hover:bg-white text-sm font-semibold
             flex items-center bg- justify-start p-2 rounded-md hover:shadow-lg`}
            onClick={() => {
              handleNavigation("/friends");
              closeMsgBox();
              closeNotificationBox();
            }}
          >
            <div className="relative">
              <div className="flex items-center">
                <Users className="mr-4 w-6 h-6" />
                <p>{t("friends")}</p>
              </div>
              {unreadCount > 0 && (
                <span
                  className="absolute -top-4 -right-9 bg-green-700 text-white 
                text-xs px-2 py-0.5 rounded-full"
                >
                  {unreadCount <= 99 ? unreadCount : "99+"}
                </span>
              )}
            </div>
          </motion.button>
          <motion.button
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`w-full cursor-pointer dark:font-normal ${
              isNotificationBoxOpen
                ? "bg-white dark:bg-[rgb(55,55,55)] shadow-lg"
                : "bg-transparent"
            } dark:hover:bg-[rgb(55,55,55)]  hover:bg-white text-sm font-semibold flex
             items-center justify-start p-2 rounded-md hover:shadow-lg`}
            onClick={() => {
              toggleNotificationBox();
              closeMsgBox();
            }}
          >
            <div className="relative">
              <div className="flex items-center">
                <Bell className="mr-4 w-6 h-6" />
                <p>{t("noti")}</p>
              </div>
              {unreadCount > 0 && (
                <span
                  className="absolute -top-4 right-0 bg-green-700 text-white text-xs
                 px-2 py-0.5 rounded-full"
                >
                  {unreadCount <= 99 ? unreadCount : "99+"}
                </span>
              )}
            </div>
          </motion.button>
          <motion.button
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`w-full cursor-pointer dark:font-normal ${
              isMsgBoxOpen
                ? "bg-white dark:bg-[rgb(55,55,55)] shadow-lg"
                : "bg-transparent"
            } dark:hover:bg-[rgb(55,55,55)]  hover:bg-white text-sm font-semibold flex
             items-center bg- justify-start p-2 rounded-md hover:shadow-lg`}
            onClick={() => {
              handleNavigation(`/messages/${user?._id}`);
              closeNotificationBox();
              resetUnread();
            }}
          >
            <div className="relative">
              <div className="flex items-center">
                <ChatBubbleLeftRightIcon className="mr-4 w-6 h-6" />
                <p>{t("msgs")}</p>
              </div>
              {unreadCount > 0 && (
                <span
                  className="absolute -top-4 -right-4 bg-green-700 text-white text-xs
                 px-2 py-0.5 rounded-full"
                >
                  {unreadCount <= 99 ? unreadCount : "99+"}
                </span>
              )}
            </div>
          </motion.button>

          {[
            {
              id: 2,
              label: <p>{t("videos")}</p>,
              navPath: "/videos",
              icon: TvMinimalPlay,
            },
            {
              id: 3,
              label: <p>{t("blogs")}</p>,
              navPath: "/about-jobs",
              icon: BriefcaseBusiness,
            },
            {
              id: 4,
              label: <p>{t("studyInJapan")}</p>,
              navPath: "/study-in-japan",
              icon: School,
            },
            {
              id: 5,
              label: <p>{t("notes")}</p>,
              navPath: "/notes",
              icon: BookOpen,
            },
            {
              id: 6,
              label: <p>{t("game")}</p>,
              navPath: "/games",
              icon: Dices,
            },
            {
              id: 7,
              label: <p>{t("jobApply")}</p>,
              navPath: "/jobs",
              icon: Handshake,
            },
            {
              id: 8,
              label: <p>{t("recruiters")}</p>,
              navPath: "/recruiters",
              icon: ChartNoAxesCombined,
            },
            {
              id: 1,
              label: <p>{t("schools")}</p>,
              navPath: "/schools-in-japan",
              icon: Building2,
            },
          ].map(({ id, label, icon: Icon, navPath }) => {
            const isActive = pathname === navPath;
            return (
              <motion.button
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-full cursor-pointer dark:font-normal ${
                  isActive
                    ? "bg-white dark:bg-[rgb(55,55,55)] shadow-lg"
                    : "bg-transparent"
                } dark:hover:bg-[rgb(55,55,55)]  hover:bg-white text-sm font-semibold 
                flex items-center bg- justify-start p-2 rounded-md hover:shadow-lg`}
                onClick={() => {
                  handleNavigation(navPath);
                  closeMsgBox();
                  closeNotificationBox();
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
        <div
          className="fixed inset-0 flex items-center justify-center bg-white/30
        dark:bg-black/60 backdrop-blur-xs z-[9999]"
        >
          <Spinner />
        </div>
      )}
    </>
  );
};
export default LeftSideBar;
