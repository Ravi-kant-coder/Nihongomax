"use client";
import { useEffect, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { BookOpen, MessageCircle, Home, Users } from "lucide-react";
import useMsgStore from "@/store/useMsgStore";
import useNotificationStore from "@/store/useNotificationStore";
import useStudyStore from "@/store/useStudyStore";
import Spinner from "./Spinner";
import StudyBox from "./StudyBox";

const NavbarBelow = () => {
  const router = useRouter();
  const { isMsgBoxOpen, toggleMsgBox, unreadCount, closeMsgBox } =
    useMsgStore();
  const { closeNotificationBox } = useNotificationStore();
  const { isStudyBoxOpen, toggleStudyBox, closeStudyBox } = useStudyStore();
  const [isPending, startTransition] = useTransition();
  const handleNavigation = (path) => {
    startTransition(() => {
      router.push(path);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      useMsgStore.getState().incrementUnread();
      useNotificationStore.getState().incrementNotification();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 ">
      {isStudyBoxOpen && <StudyBox />}
      <div className="bg-gray-300 h-15 dark:bg-black flex justify-between items-center px-4">
        <button
          className={`w-25 cursor-pointer text-xs hover:bg-white rounded-md ${
            pathname === "/friends"
              ? "bg-white dark:bg-[rgb(55,55,55)] shadow-lg"
              : "bg-transparent"
          } dark:hover:bg-[rgb(55,55,55)] font-semibold flex items-center justify-center 
          py-1 px-2 rounded-md hover:shadow-lg`}
          onClick={() => {
            handleNavigation("/friends");
            closeMsgBox();
            closeNotificationBox();
            closeStudyBox();
          }}
        >
          <div className="relative flex flex-col items-center justify-center">
            <Users />
            <p className="mt-1">Friends</p>

            {unreadCount > 0 && (
              <span
                className="absolute -top-3 left-6 bg-green-700 text-white text-xs 
              px-2 py-0.5 rounded-full"
              >
                {unreadCount <= 99 ? unreadCount : "99+"}
              </span>
            )}
          </div>
        </button>
        <button
          className={`w-25 cursor-pointer text-xs hover:bg-white rounded-md ${
            isMsgBoxOpen
              ? "bg-white dark:bg-[rgb(55,55,55)] shadow-lg"
              : "bg-transparent"
          } dark:hover:bg-[rgb(55,55,55)] font-semibold flex items-center justify-center 
          py-1 px-2 rounded-md hover:shadow-lg`}
          onClick={() => {
            toggleMsgBox();
            closeNotificationBox();
            closeStudyBox();
          }}
        >
          <div className="relative flex flex-col items-center justify-center">
            <MessageCircle />
            <p className="mt-1">Messages</p>

            {unreadCount > 0 && (
              <span
                className="absolute -top-3 left-6 bg-green-700 text-white text-xs
               px-2 py-0.5 rounded-full"
              >
                {unreadCount <= 99 ? unreadCount : "99+"}
              </span>
            )}
          </div>
        </button>
        <button
          onClick={() => {
            handleNavigation("/");
            closeMsgBox();
            closeNotificationBox();
            closeStudyBox();
          }}
          className={`w-25 cursor-pointer text-xs hover:bg-white rounded-md ${
            pathname === "/"
              ? "bg-white dark:bg-[rgb(55,55,55)] shadow-lg"
              : "bg-transparent"
          } dark:hover:bg-[rgb(55,55,55)] font-semibold flex items-center justify-center 
          py-1 px-2 rounded-md hover:shadow-lg`}
        >
          <div className="flex flex-col items-center justify-center">
            <Home />
            <p className="mt-1">Home</p>
          </div>
        </button>
        <button
          className={`w-25 cursor-pointer text-xs hover:bg-white rounded-md ${
            isStudyBoxOpen
              ? "bg-white dark:bg-[rgb(55,55,55)] shadow-lg"
              : "bg-transparent"
          } dark:hover:bg-[rgb(55,55,55)] font-semibold flex items-center justify-center 
          py-1 px-2 rounded-md hover:shadow-lg`}
          onClick={() => {
            toggleStudyBox();
            closeMsgBox();
            closeNotificationBox();
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <BookOpen />
            <p className="mt-1">Study Jap</p>
          </div>{" "}
        </button>
      </div>{" "}
      {isPending && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-white/30
        dark:bg-black/60 backdrop-blur-xs z-[9999]"
        >
          <Spinner />
        </div>
      )}
      <div
        className="text-xs rounded bg-gray-300 dark:bg-black dark:text-white 
      text-center"
      >
        <h1>Nihongomax 7678461209</h1>
      </div>
    </div>
  );
};

export default NavbarBelow;
