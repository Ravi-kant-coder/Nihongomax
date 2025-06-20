"use client";
// import useSidebarStore from "../store/useSidebarStore";
import { useRouter, usePathname } from "next/navigation";
import { BookOpen, MessageCircle, School, Home, Users } from "lucide-react";
import useMsgStore from "@/stores/useMsgStore";
import Spinner from "./Spinner";
import { useEffect, useTransition } from "react";
import useNotificationStore from "@/stores/useNotificationStore";

const NavbarBelow = () => {
  const router = useRouter();
  const { isMsgBoxOpen, toggleMsgBox, unreadCount } = useMsgStore();
  const [isPending, startTransition] = useTransition();
  // const { toggleSidebar } = useSidebarStore();
  const handleNavigation = (path) => {
    startTransition(() => {
      router.push(path);
    });
  };

  const {
    toggleNotificationBox,
    isNotificationBoxOpen,
    incrementNotification,
    unreadNotificationCount,
  } = useNotificationStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      useMsgStore.getState().incrementUnread();
      useNotificationStore.getState().incrementNotification();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-gray-300 h-15 dark:bg-black  flex justify-around items-center">
        <button
          onClick={() => {
            handleNavigation("/schools-in-japan");
          }}
          className={`cursor-pointer md:p-3 text-xs hover:bg-white rounded-md dark:hover:bg-black cursor-pointer"
         ${
           pathname === "/schools-in-japan"
             ? "bg-white dark:bg-[rgb(55,55,55)]"
             : "bg-transparent"
         } dark:hover:bg-[rgb(55,55,55)] hover:bg-white text-sm font-semibold flex items-center bg- justify-start p-2 rounded-md`}
        >
          <div className="flex md:w-12 flex-col items-center justify-center">
            <School />
            <p className="mt-2">Jap Schools</p>
          </div>{" "}
        </button>
        <button
          className={`cursor-pointer text-xs hover:bg-white rounded-md dark:hover:bg-black cursor-pointer"
         ${
           pathname === "/friends"
             ? "bg-white dark:bg-[rgb(55,55,55)]"
             : "bg-transparent"
         } dark:hover:bg-[rgb(55,55,55)] hover:bg-white text-sm font-semibold flex items-center bg- justify-start p-2 rounded-md`}
          onClick={() => {
            handleNavigation("/friends");
          }}
        >
          <div className="relative flex flex-col items-center justify-center">
            <Users />
            <p className="mt-2">Friends</p>

            {unreadCount > 0 && (
              <span className="absolute -top-3 left-6 bg-green-700 text-white text-xs px-2 py-0.5 rounded-full">
                {unreadCount <= 99 ? unreadCount : "99+"}
              </span>
            )}
          </div>
        </button>
        <button
          className={`cursor-pointer text-xs hover:bg-white rounded-md dark:hover:bg-black cursor-pointer"
         ${
           isMsgBoxOpen ? "bg-white dark:bg-[rgb(55,55,55)]" : "bg-transparent"
         } dark:hover:bg-[rgb(55,55,55)] hover:bg-white text-sm font-semibold flex items-center bg- justify-start p-2 rounded-md`}
          onClick={toggleMsgBox}
        >
          <div className="relative flex flex-col items-center justify-center">
            <MessageCircle />
            <p className="mt-2">Messages</p>

            {unreadCount > 0 && (
              <span className="absolute -top-3 left-6 bg-green-700 text-white text-xs px-2 py-0.5 rounded-full">
                {unreadCount <= 99 ? unreadCount : "99+"}
              </span>
            )}
          </div>
        </button>
        <button
          onClick={() => {
            handleNavigation("/");
          }}
          className={`cursor-pointer text-xs hover:bg-white rounded-md dark:hover:bg-black cursor-pointer"
         ${
           pathname === "/"
             ? "bg-white dark:bg-[rgb(55,55,55)]"
             : "bg-transparent"
         } dark:hover:bg-[rgb(55,55,55)] hover:bg-white text-sm font-semibold flex items-center bg- justify-start p-2 rounded-md`}
        >
          <div className="flex flex-col items-center justify-center">
            <Home />
            <p className="mt-2">Home</p>
          </div>
        </button>
        <button
          onClick={() => {
            handleNavigation("/");
          }}
          className="text-xs hover:bg-white rounded-md dark:hover:bg-black cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center">
            <BookOpen />
            <p className="mt-2">Study Jap</p>
          </div>{" "}
        </button>
      </div>{" "}
      <div className="text-xs rounded bg-gray-300 dark:bg-black dark:text-white text-center">
        <h1>Nihongomax 7678461209</h1>
      </div>
    </div>
  );
};

export default NavbarBelow;
