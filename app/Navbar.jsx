"use client";
import { useEffect, useTransition, useRef, useState } from "react";
import { useTheme } from "next-themes";
import JapanGate from "../app/JapanGate";
import { useRouter, usePathname } from "next/navigation";
import useMsgStore from "@/store/useMsgStore";
import useNotificationStore from "@/store/useNotificationStore";
import useStudyStore from "@/store/useStudyStore";
import { logout } from "@/service/auth.service";
import { getAllUsers } from "@/service/user.service";
import userStore from "@/store/userStore";
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
import NotificationBox from "@/app/NotificationBox";
import SearchInNav from "@/app/SearchInNav";
import MsgBox from "./MsgBox";
import UserMenu from "./UserMenu";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

const Navbar = () => {
  const { closeStudyBox } = useStudyStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userList, setUserList] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const searchRef = useRef(null);
  const { theme, setTheme } = useTheme();
  const { user, clearUser } = userStore();

  const handleNavigation = (path) => {
    startTransition(() => {
      router.push(path);
    });
  };

  const {
    isMsgBoxOpen,
    toggleMsgBox,
    incrementUnread,
    unreadCount,
    closeMsgBox,
    resetUnread,
  } = useMsgStore();
  const {
    toggleNotificationBox,
    isNotificationBoxOpen,
    closeNotificationBox,
    incrementNotification,
    unreadNotificationCount,
  } = useNotificationStore();

  // const { toggleSidebar } = useSidebarStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      useMsgStore.getState().incrementUnread();
      useNotificationStore.getState().incrementNotification();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const pathname = usePathname();
  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result?.status == "success") {
        router.push("/user-login");
        clearUser();
      }
      toast.success("user logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error("failed to log out");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const result = await getAllUsers();
        setUserList(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filterUser = userList.filter((user) => {
        return user.username.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilterUsers(filterUser);
      setIsSearchOpen(true);
    } else {
      setFilterUsers([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery, userList]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearchOpen(false);
  };

  const handleUserClick = async (userId) => {
    try {
      setLoading(true);
      setIsSearchOpen(false);
      setSearchQuery("");
      await router.push(`user-profile/${userId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClose = (e) => {
    if (!searchRef.current?.contains(e.target)) {
      setIsSearchOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleSearchClose);
    return () => {
      document.removeEventListener("click", handleSearchClose);
    };
  });

  if (loading) {
    return <Spinner />;
  }
  return (
    <header className="fixed dark:bg-black md:py-2 py-1 bg-gray-200 md:shadow-lg top-0 left-0 right-0 z-50 p-2 lg:mx-auto flex items-center  justify-between">
      <div className="hidden md:block">
        <a href={"https://www.learnjapanesedelhi.com/"} target="_blank">
          <JapanGate />
        </a>
      </div>

      <div className="md:flex w-full items-center justify-between">
        <div className="flex items-center justify-between mb-5 md:mb-0 ">
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
              className={`w-full cursor-pointer dark:font-normal ${
                isNotificationBoxOpen
                  ? "bg-white dark:bg-[rgb(55,55,55)]"
                  : "bg-transparent"
              } dark:hover:bg-[rgb(55,55,55)] hover:bg-white text-sm mx-4 font-semibold flex items-center bg- justify-start rounded-md`}
              onClick={() => {
                toggleNotificationBox();
                closeMsgBox();
                closeStudyBox();
              }}
            >
              <div className="relative flex md:w-12 flex-col items-center justify-center">
                <Bell />
                <p className="mt-1">Notifications</p>

                {unreadCount > 0 && (
                  <span className="absolute -top-2 right-4 bg-green-700 text-white text-xs px-2 py-0.5 rounded-full">
                    {unreadCount <= 99 ? unreadCount : "99+"}
                  </span>
                )}
              </div>
            </button>
            <div className="mr-2">
              <UserMenu />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center md:mt-0 mt-2">
          <div className="md:flex items-center justify-center hidden ">
            <button
              onClick={() => {
                handleNavigation("/");
                closeMsgBox();
                closeNotificationBox();
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
              } dark:hover:bg-[rgb(55,55,55)] hover:bg-white text-sm font-semibold 
              flex items-center bg- justify-start p-2 rounded-md`}
              onClick={() => {
                handleNavigation("/friends");
                closeMsgBox();
                closeNotificationBox();
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
              onClick={() => {
                toggleNotificationBox();
                closeMsgBox();
              }}
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
              onClick={() => {
                toggleMsgBox();
                closeNotificationBox();
                resetUnread();
              }}
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
            {
              icon: BriefcaseBusiness,
              path: "/about-jobs",
              name: "About",
            },
            { icon: Handshake, path: "/jobs", name: "Jobs" },
            { icon: School, path: "/schools-in-japan", name: "Schools" },
            { icon: Dices, path: "/games", name: "Games" },
            { icon: TvMinimalPlay, path: "/videos", name: "Videos" },
          ].map(({ icon: Icon, path, name }) => {
            const isActive = pathname === path;
            return (
              <button
                onClick={() => {
                  handleNavigation(path);
                  closeMsgBox();
                  closeNotificationBox();
                  closeStudyBox();
                }}
                key={name}
                className={`md:p-3 w-full cursor-pointer dark:font-normal ${
                  isActive
                    ? "bg-white dark:bg-[rgb(55,55,55)]"
                    : "bg-transparent"
                } dark:hover:bg-[rgb(55,55,55)] hover:bg-white text-sm font-semibold flex items-center justify-center rounded-md`}
              >
                <div className="flex md:w-12 flex-col items-center justify-center">
                  <Icon />
                  <p className="md:hidden block text-xs mt-1">{name}</p>
                </div>
              </button>
            );
          })}
          <div className="hidden md:block mr-2">
            <UserMenu handleLogout={handleLogout} />
          </div>
        </div>
      </div>
      {isNotificationBoxOpen && <NotificationBox />}
      {isMsgBoxOpen && <MsgBox />}
      {isPending && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-white/30
        dark:bg-black/60 backdrop-blur-xs z-[9999]"
        >
          <Spinner />
        </div>
      )}
    </header>
  );
};

export default Navbar;
