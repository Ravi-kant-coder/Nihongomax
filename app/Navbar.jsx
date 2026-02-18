"use client";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
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
import { usePostStore } from "@/store/usePostStore";
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
  Search,
} from "lucide-react";
import NotificationBox from "@/app/NotificationBox";
import MsgBox from "./MsgBox";
import UserMenu from "./UserMenu";
import Spinner from "./Spinner";
import { Input } from "@/components/ui/input";
import LangToggleBtn from "./LangToggleBtn";
const Navbar = () => {
  const { closeStudyBox } = useStudyStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userList, setUserList] = useState([]);
  const [filterUser, setFilterUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const searchRef = useRef(null);
  const { theme, setTheme } = useTheme();
  const { user, clearUser } = userStore();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

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
        usePostStore.getState().resetAll();
        clearUser();
        router.push("/user-login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //For search bar
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const result = await getAllUsers(); //from axios services
        setUserList(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // for debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchQuery);
    }, 500);
    return () => {
      clearTimeout(handler); // cancel timeout if user types again
    };
  }, [searchQuery]);

  const handleNavigation = (path) => {
    startTransition(() => {
      router.push(path);
    });
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filterUser = userList.filter((user) => {
        return user?.username
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());
      });
      setFilterUsers(filterUser);
      setIsSearchOpen(true);
    } else {
      setFilterUsers([]);
      setIsSearchOpen(false);
    }
  }, [debouncedSearchTerm, userList]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearchOpen(false);
  };

  //To make the alphabets highlighted
  const highlightMatch = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <span key={i} className="dark:text-gray-500 font-bold">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  //Routing to searched user profile page
  const handleUserClick = async (userId) => {
    try {
      setIsSearchOpen(false);
      setSearchQuery("");
      startTransition(() => router.push(`/user-profile/${userId}`));
    } catch (error) {
      console.log(error);
    }
  };

  //Outside ref to close the search box
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

  return (
    <header
      className="fixed dark:bg-black md:py-2 py-1 bg-gray-200 md:shadow-lg top-0 
    left-0 right-0 z-50 p-2 lg:mx-auto flex items-center  justify-between"
    >
      <div className="hidden md:block">
        <a href={"https://www.learnjapanesedelhi.com/"} target="_blank">
          <JapanGate />
        </a>
      </div>

      {/* -----------------------Search bar--------------------------   */}

      <div className="md:flex w-full items-center justify-between">
        <div className="flex items-center justify-between mb-5 md:mb-0 ">
          <div className="md:mr-5">
            <div ref={searchRef}>
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Search
                    className="absolute left-2 top-1/2 transform -translate-y-1/2
                   text-gray-400"
                  />
                  <Input
                    className="pl-8 cursor-pointer w-full dark:bg-[rgb(75,75,75)] bg-white
                    rounded-full"
                    placeholder="Search Friends..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div>
                    {isSearchOpen && (
                      <div
                        className="absolute bg-white dark:bg-gray-800 border border-gray-200
                         dark:border-gray-700 rounded-md shadow-lg mt-1 z-50"
                      >
                        <div className="p-2">
                          {filterUser.length > 0 ? (
                            filterUser.slice(0, 10).map((user) => (
                              <div
                                className="flex items-center space-x-8 p-2 hover:bg-gray-200
                              dark:hover:bg-gray-700 rounded-md cursor-pointer"
                                key={user?._id}
                                onClick={() => handleUserClick(user?._id)}
                              >
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage
                                      src={user?.profilePicture}
                                      className="object-cover"
                                    />
                                    <AvatarFallback>
                                      {user?.username
                                        .split(" ")[0][0]
                                        .toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="truncate w-[90%]">
                                    {highlightMatch(
                                      user?.username,
                                      debouncedSearchTerm,
                                    )}
                                  </span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="p-2 text-gray-700">
                              No results found
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* -----------------------Institute number box---------------   */}

          <a href={"https://www.learnjapanesedelhi.com/"} target="_blank">
            <div
              className="text-sm hidden md:block rounded bg-[rgb(60,60,60)] 
            dark:bg-[rgb(55,55,55)]  hover:bg-black md:p-2 p-1 text-white 
            dark:hover:bg-[rgb(35,35,35)]"
            >
              <h1> Nihongomax 7678461209</h1>
            </div>
          </a>
          {/* -----------------------Notifications button (Mobile)---------------   */}

          <div className="md:hidden flex items-center justify-center">
            <button
              className={`w-full cursor-pointer dark:font-normal ${
                isNotificationBoxOpen
                  ? "bg-white dark:bg-[rgb(55,55,55)] shadow-lg"
                  : "bg-transparent"
              } dark:hover:bg-[rgb(55,55,55)] hover:bg-white text-sm mx-4 font-semibold
               flex items-center bg- justify-start rounded-md hover:shadow-lg`}
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
                  <span
                    className="absolute -top-2 right-4 bg-green-700 text-white text-xs 
                  px-2 py-0.5 rounded-full"
                  >
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

        {/* -----------------------Main Navbar--------------- -----  */}

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
                  ? "bg-white dark:bg-[rgb(55,55,55)] shadow-lg"
                  : "bg-transparent"
              } dark:hover:bg-[rgb(55,55,55)] hover:bg-white text-sm font-semibold 
              flex items-center bg- justify-start p-2 rounded-md hover:shadow-lg`}
            >
              <div className="flex md:w-12 flex-col items-center justify-center">
                <Home />
              </div>
            </button>
            <button
              className={`md:p-3 w-full cursor-pointer dark:font-normal ${
                pathname === "/friends"
                  ? "bg-white dark:bg-[rgb(55,55,55)] shadow-lg"
                  : "bg-transparent"
              } dark:hover:bg-[rgb(55,55,55)] hover:bg-white text-sm font-semibold 
              flex items-center bg- justify-start p-2 rounded-md hover:shadow-lg`}
              onClick={() => {
                handleNavigation("/friends");
                closeMsgBox();
                closeNotificationBox();
              }}
            >
              <div className="relative flex md:w-12 flex-col items-center justify-center">
                <Users />
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
              className={`md:p-3 w-full cursor-pointer dark:font-normal ${
                isNotificationBoxOpen
                  ? "bg-white dark:bg-[rgb(55,55,55)] shadow-lg"
                  : "bg-transparent"
              } dark:hover:bg-[rgb(55,55,55)] hover:bg-white text-sm font-semibold flex 
              items-center bg- justify-start p-2 rounded-md hover:shadow-lg`}
              onClick={() => {
                toggleNotificationBox();
                closeMsgBox();
              }}
            >
              <div className="relative flex md:w-12 flex-col items-center justify-center">
                <Bell />
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
              className={`md:p-3 w-full cursor-pointer dark:font-normal ${
                isMsgBoxOpen
                  ? "bg-white dark:bg-[rgb(55,55,55)] shadow-lg"
                  : "bg-transparent"
              } dark:hover:bg-[rgb(55,55,55)] hover:bg-white text-sm font-semibold flex 
              items-center bg- justify-start p-2 rounded-md hover:shadow-lg`}
              onClick={() => {
                handleNavigation(`/chat/${user?._id}`);
                closeNotificationBox();
                resetUnread();
              }}
            >
              <div className="relative flex md:w-12 flex-col items-center justify-center">
                <MessageCircle />
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
            { icon: School, path: "/study-in-japan", name: "Schools" },
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
                    ? "bg-white dark:bg-[rgb(55,55,55)] shadow-lg"
                    : "bg-transparent"
                } dark:hover:bg-[rgb(55,55,55)] hover:bg-white text-sm font-semibold 
                flex items-center justify-center rounded-md hover:shadow-lg`}
              >
                <div className="flex md:w-12 flex-col items-center justify-center">
                  <Icon />
                  <p className="md:hidden block text-xs mt-1">{name}</p>
                </div>
              </button>
            );
          })}
          <div className="hidden md:block ml-2">
            <LangToggleBtn />
          </div>
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
