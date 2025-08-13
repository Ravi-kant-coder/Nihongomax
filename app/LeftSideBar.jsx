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
  Search,
  BookOpen,
} from "lucide-react";
import useMsgStore from "@/store/useMsgStore";
import useNotificationStore from "@/store/useNotificationStore";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Spinner from "./Spinner";

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

  return (
    <>
      {" "}
      {isPending && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-white/30
        dark:bg-black/60 backdrop-blur-xs z-[9999]"
        >
          <Spinner />
        </div>
      )}
      <aside className="fixed h-full hidden w-70 md:p-1 md:flex flex-col z-50 md:z-0">
        <nav className="space-y-4 flex-grow h-full flex flex-col overflow-y-auto">
          <div
            onClick={() => {
              handleNavigation(`/user-profile/${user?._id}`);
              closeMsgBox();
              closeNotificationBox();
            }}
            className="flex items-center group space-x-2 cursor-pointer hover:shadow-lg
             dark:hover:bg-[rgb(55,55,55)] hover:bg-white p-1 rounded-md"
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
            <div>
              <div className="font-semibold capitalize">My profile</div>
              <div className="capitalize text-xs truncate">
                {user?.username}
              </div>
            </div>
          </div>

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
              <div className="flex">
                <Users className="mr-4 w-5 h-5" />
                Friends
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
             items-center bg- justify-start p-2 rounded-md hover:shadow-lg`}
            onClick={() => {
              toggleNotificationBox();
              closeMsgBox();
            }}
          >
            <div className="relative">
              <div className="flex">
                <Bell className="mr-4 w-5 h-5" />
                Notifications
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
              toggleMsgBox();
              closeNotificationBox();
              resetUnread();
            }}
          >
            <div className="relative">
              <div className="flex">
                <MessageCircle className="mr-4 w-5 h-5" />
                Messages
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
              id: 4,
              label: "Home",
              navPath: "/",
              icon: Home,
            },
            {
              id: 5,
              label: "Videos",
              navPath: "/videos",
              icon: TvMinimalPlay,
            },
            {
              id: 6,
              label: "About Jobs in Japan",
              navPath: "/about-jobs",
              icon: BriefcaseBusiness,
            },
            {
              id: 7,
              label: "Schools in Japan",
              navPath: "/schools-in-japan",
              icon: School,
            },
            {
              id: 11,
              label: "Notes",
              navPath: "/notes",
              icon: BookOpen,
            },
            {
              id: 8,
              label: "Kanji Games",
              navPath: "/games",
              icon: Dices,
            },
            {
              id: 9,
              label: "Apply for Jobs",
              navPath: "/jobs",
              icon: Handshake,
            },
            {
              id: 10,
              label: "For Recruiters",
              navPath: "/recruiters",
              icon: ChartNoAxesCombined,
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
                <Icon className="mr-4 w-5 h-5" />
                {label}
              </motion.button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
export default LeftSideBar;
