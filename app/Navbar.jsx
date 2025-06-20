"use client";
import { useTheme } from "next-themes";
import JapanGate from "../app/JapanGate";
import { useRouter, usePathname } from "next/navigation";
// import useSidebarStore from "../store/sidebarStore";
import useMsgStore from "@/stores/useMsgStore";
import useNotificationStore from "@/stores/useNotificationStore";
import {
  Home,
  Users,
  Bell,
  MessageCircle,
  ChartNoAxesCombined,
  TvMinimalPlay,
  Handshake,
  School,
  Dices,
  BriefcaseBusiness,
} from "lucide-react";
import { useEffect, useTransition } from "react";
import NotificationBox from "@/app/NotificationBox";
import SearchInNav from "@/app/SearchInNav";
import MsgBox from "./MsgBox";
import UserMenu from "./UserMenu";
import Spinner from "./Spinner";

const Navbar = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleNavigation = (path) => {
    startTransition(() => {
      router.push(path);
    });
  };

  const { isMsgBoxOpen, toggleMsgBox, incrementUnread, unreadCount } =
    useMsgStore();
  const {
    toggleNotificationBox,
    isNotificationBoxOpen,
    incrementNotification,
    unreadNotificationCount,
  } = useNotificationStore();
  const { theme, setTheme } = useTheme();

  // const { toggleSidebar } = useSidebarStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      useMsgStore.getState().incrementUnread();
      useNotificationStore.getState().incrementNotification();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const pathname = usePathname();

  return (
    <header className="fixed dark:bg-black md:py-2 bg-gray-300 md:shadow-lg top-0 left-0 right-0 z-50 p-2 lg:mx-auto flex items-center  justify-between">
      <div className="hidden md:block">
        <a href={"https://www.learnjapanesedelhi.com/"} target="_blank">
          <JapanGate />
        </a>
      </div>

      <div className="md:flex w-full items-center justify-between">
        <div className="flex justify-between mb-5 md:mb-0 ">
          <div className="lg:mr-5">
            <SearchInNav />
          </div>
          <a href={"https://www.learnjapanesedelhi.com/"} target="_blank">
            <div className="text-sm hidden md:block rounded bg-[rgb(60,60,60)] dark:bg-[rgb(55,55,55)]  hover:bg-black md:p-2 p-1 text-white dark:hover:bg-[rgb(35,35,35)]">
              <h1> Nihongomax 7678461209</h1>
            </div>
          </a>

          <div className="md:hidden flex items-center justify-center">
            <button
              onClick={() => {
                handleNavigation("/notifications");
              }}
              key={"notfctns"}
              className="md:p-3 text-xs hover:bg-white rounded-md dark:hover:bg-[rgb(55,55,55)] cursor-pointer"
            >
              <div className="flex md:w-12 flex-col items-center justify-center">
                <Bell />
              </div>{" "}
            </button>
            <UserMenu />
          </div>
        </div>
        <div className="flex justify-between items-center md:mt-0 mt-2">
          <div className="md:flex items-center justify-center hidden bg-amber-200">
            <button
              onClick={() => {
                handleNavigation("/");
              }}
              className={`md:p-3 w-full cursor-pointer dark:font-normal ${
                pathname === "/"
                  ? "bg-white dark:bg-[rgb(55,55,55)]"
                  : "bg-transparent"
              } dark:hover:bg-[rgb(55,55,55)] hover:bg-white text-sm font-semibold flex items-center bg- justify-start p-2 rounded-md`}
            >
              <div className="flex md:w-12 flex-col items-center justify-center">
                <Home />
              </div>
            </button>

            <button
              className={`md:p-3 w-full cursor-pointer dark:font-normal ${
                pathname === "/friends"
                  ? "bg-white dark:bg-[rgb(55,55,55)]"
                  : "bg-transparent"
              } dark:hover:bg-[rgb(55,55,55)] hover:bg-white text-sm font-semibold flex items-center bg- justify-start p-2 rounded-md`}
              onClick={() => {
                handleNavigation("/friends");
              }}
            >
              <div className="relative flex md:w-12 flex-col items-center justify-center">
                <Users />
                {unreadCount > 0 && (
                  <span className="absolute -top-3 left-6 bg-green-700 text-white text-xs px-2 py-0.5 rounded-full">
                    {unreadCount <= 99 ? unreadCount : "99+"}
                  </span>
                )}
              </div>
            </button>
            <button
              className={`md:p-3 w-full cursor-pointer dark:font-normal ${
                isNotificationBoxOpen
                  ? "bg-white dark:bg-[rgb(55,55,55)]"
                  : "bg-transparent"
              } dark:hover:bg-[rgb(55,55,55)] hover:bg-white text-sm font-semibold flex items-center bg- justify-start p-2 rounded-md`}
              onClick={toggleNotificationBox}
            >
              <div className="relative flex md:w-12 flex-col items-center justify-center">
                <Bell />
                {unreadCount > 0 && (
                  <span className="absolute -top-3 left-6 bg-green-700 text-white text-xs px-2 py-0.5 rounded-full">
                    {unreadCount <= 99 ? unreadCount : "99+"}
                  </span>
                )}
              </div>
            </button>
            <button
              className={`md:p-3 w-full cursor-pointer dark:font-normal ${
                isMsgBoxOpen
                  ? "bg-white dark:bg-[rgb(55,55,55)]"
                  : "bg-transparent"
              } dark:hover:bg-[rgb(55,55,55)] hover:bg-white text-sm font-semibold flex items-center bg- justify-start p-2 rounded-md`}
              onClick={toggleMsgBox}
            >
              <div className="relative flex md:w-12 flex-col items-center justify-center">
                <MessageCircle />
                {unreadCount > 0 && (
                  <span className="absolute -top-3 left-6 bg-green-700 text-white text-xs px-2 py-0.5 rounded-full">
                    {unreadCount <= 99 ? unreadCount : "99+"}
                  </span>
                )}
              </div>
            </button>
          </div>
          {[
            {
              icon: ChartNoAxesCombined,
              path: "/recruiters",
              name: "Recruiters",
            },
            { icon: Handshake, path: "/jobs", name: "Jobs" },
            {
              icon: BriefcaseBusiness,
              path: "/about-jobs",
              name: "About Jobs",
            },
            { icon: Dices, path: "/games", name: "Games" },
            { icon: TvMinimalPlay, path: "/videos", name: "Videos" },
          ].map(({ icon: Icon, path, name }) => {
            const isActive = pathname === path;
            return (
              <button
                onClick={() => {
                  handleNavigation(path);
                }}
                key={name}
                className={`md:p-3 w-full cursor-pointer dark:font-normal ${
                  isActive
                    ? "bg-white dark:bg-[rgb(55,55,55)]"
                    : "bg-transparent"
                } dark:hover:bg-[rgb(55,55,55)] hover:bg-white text-sm font-semibold flex items-center bg- justify-start p-2 rounded-md`}
              >
                <div className="flex md:w-12 flex-col items-center justify-center">
                  <Icon />
                </div>
              </button>
            );
          })}
          <div className="hidden md:block">
            <UserMenu />
          </div>
        </div>
      </div>
      {isNotificationBoxOpen && <NotificationBox />}
      {isMsgBoxOpen && <MsgBox />}
      {isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-[9999] transition-opacity duration-300 opacity-100">
          <Spinner />
        </div>
      )}
    </header>
  );
};

export default Navbar;
