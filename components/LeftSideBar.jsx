"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "lucide-react";
import useMsgStore from "@/stores/useMsgStore";
import useNotificationStore from "@/stores/useNotificationStore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const LeftSideBar = () => {
  const { isMsgBoxOpen, toggleMsgBox, incrementUnread, unreadCount } =
    useMsgStore();
  const {
    toggleNotificationBox,
    isNotificationBoxOpen,
    incrementNotification,
    unreadNotificationCount,
  } = useNotificationStore();

  const router = useRouter();
  const handleNavigation = (path, item) => {
    router.push(path);
  };
  const pathname = usePathname();

  return (
    <aside className="fixed h-full hidden w-70 md:p-1 md:flex flex-col z-50 md:z-0">
      <div className="h-full flex flex-col overflow-y-auto">
        <nav className="space-y-4 flex-grow">
          <div
            onClick={() => {
              handleNavigation("/user-profile");
            }}
            className="flex items-center bg-white group space-x-2 cursor-pointer dark:bg-[rgb(35,35,35)] dark:hover:bg-[rgb(55,55,55)] hover:bg-gray-400 p-1 rounded-md"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage />
              <AvatarFallback className="font-semibold text-lg dark:bg-gray-500 bg-gray-200 dark:text-white group-hover:bg-gray-300">
                G
              </AvatarFallback>
            </Avatar>
            <span className="font-semibold">Simran Kaur</span>
          </div>
          {[
            {
              id: 1,
              label: "Home",
              navPath: "/",
              icon: Home,
            },
            {
              id: 2,
              label: "Friends",
              navPath: "/friends",
              icon: Users,
            },
          ].map(({ id, label, icon: Icon, navPath }) => {
            const isActive = pathname === navPath;
            return (
              <motion.button
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-full ${
                  isActive ? "bg-white text-black" : "bg-transparent"
                } cursor-pointer dark:font-normal dark:hover:bg-[rgb(55,55,55)] text-sm font-semibold flex items-center justify-start  p-2 rounded-md`}
                onClick={() => {
                  handleNavigation(navPath);
                }}
                key={id}
              >
                <Icon className="mr-4 w-5 h-5" />
                {label}
              </motion.button>
            );
          })}
          <motion.button
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full cursor-pointer dark:font-normal dark:hover:bg-[rgb(55,55,55)] text-sm font-semibold flex items-center justify-start hover:bg-white p-2 rounded-md"
            onClick={toggleMsgBox}
          >
            <div className="relative">
              <div className="flex">
                <MessageCircle className="mr-4 w-5 h-5" />
                Messages
              </div>
              {unreadCount > 0 && (
                <span className="absolute -top-4 -right-4 bg-green-700 text-white text-xs px-2 py-0.5 rounded-full">
                  {unreadCount <= 99 ? unreadCount : "99+"}
                </span>
              )}
            </div>
          </motion.button>
          <motion.button
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full cursor-pointer dark:font-normal dark:hover:bg-[rgb(55,55,55)] text-sm font-semibold flex items-center justify-start hover:bg-white p-2 rounded-md"
            onClick={toggleNotificationBox}
          >
            <div className="relative">
              <div className="flex">
                <Bell className="mr-4 w-5 h-5" />
                Notifications
              </div>
              {unreadCount > 0 && (
                <span className="absolute -top-4 -right-4 bg-green-700 text-white text-xs px-2 py-0.5 rounded-full">
                  {unreadCount <= 99 ? unreadCount : "99+"}
                </span>
              )}
            </div>
          </motion.button>
          {[
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
          ].map(({ id, label, icon: Icon, className, navPath }) => (
            <motion.button
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-full cursor-pointer dark:font-normal dark:hover:bg-[rgb(55,55,55)] text-sm font-semibold flex items-center justify-start hover:bg-white p-2 rounded-md"
              onClick={() => {
                handleNavigation(navPath);
              }}
              key={id}
            >
              <Icon className="mr-4 w-5 h-5" />
              {label}
            </motion.button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default LeftSideBar;
