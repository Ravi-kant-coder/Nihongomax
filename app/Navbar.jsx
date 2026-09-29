"use client";

import { requireAuth } from "@/lib/requireAuth";
import { useTransition } from "react";
import JapanGate from "../app/JapanGate";
import { useRouter, usePathname } from "next/navigation";
import useStudyStore from "@/store/useStudyStore";
import { logout } from "@/service/auth.service";
import userStore from "@/store/userStore";
import FriendsNotification from "./FriendsNotification";
import {
  Home,
  Users,
  ChartNoAxesCombined,
  TvMinimalPlay,
  Handshake,
  School,
  Dices,
  BriefcaseBusiness,
  Orbit,
  BookOpen,
  Car,
} from "lucide-react";
import SearchBar from "@/components/SearchBar";
import UserMenu from "./UserMenu";
import Spinner from "../components/Spinner";
import LangToggleBtn from "./LangToggleBtn";
import useT from "./hooks/useT";
import SearchBarPseudo from "@/components/SearchBarPseudo";

const Navbar = () => {
  const router = useRouter();
  const { user } = userStore();
  const { closeStudyBox } = useStudyStore();
  const [isPending, startTransition] = useTransition();
  const { clearUser } = userStore();
  const pathname = usePathname();
  const t = useT();

  const handleNavigation = (path) => {
    startTransition(() => {
      router.push(path);
    });
  };

  const handleLogout = async () => {
    try {
      const result = await logout();
      clearUser();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center bg-gray-200 dark:bg-black p-2 md:py-2 md:shadow-lg">
      <div className="hidden md:block shrink-0">
        <a href="https://www.learnjapanesedelhi.com/" target="_blank">
          <JapanGate />
        </a>
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-2 my-1 md:my-2">
          <div className="min-w-0 flex-1 md:flex-none md:w-auto">
            {user ? <SearchBar /> : <SearchBarPseudo />}
          </div>
          <div className="hidden md:block shrink-0">
            <a
              href="https://www.learnjapanesedelhi.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="relative overflow-hidden flex items-center text-sm text-white bg-[rgb(60,60,60)]
                 dark:bg-[rgb(55,55,55)] hover:bg-black dark:hover:bg-[rgb(35,35,35)] md:p-2 rounded whitespace-nowrap"
              >
                <span className="absolute left-0 -bottom-1 pointer-events-none jet-animation">
                  <Car fill="green" size={18} />
                </span>
                <h1 className="relative z-10">{t("visit")} Nihongomax</h1>
              </div>
            </a>
          </div>
        </div>

        <div className="hidden md:flex shrink-0 items-center justify-center">
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                handleNavigation("/");
              }}
              className={`p-3 w-16 cursor-pointer dark:font-normal ${
                pathname === "/"
                  ? "bg-white dark:bg-[rgb(55,55,55)] shadow-lg"
                  : "bg-transparent"
              } dark:hover:bg-[rgb(55,55,55)] hover:bg-white text-sm font-semibold 
              flex items-center justify-center rounded-md hover:shadow-lg`}
            >
              <div className="flex flex-col items-center justify-center">
                <Home />
              </div>
            </button>

            <button
              className={`p-3 w-16 hidden xl:block cursor-pointer dark:font-normal ${
                pathname === "/friends"
                  ? "bg-white dark:bg-[rgb(55,55,55)] shadow-lg"
                  : "bg-transparent"
              } dark:hover:bg-[rgb(55,55,55)] hover:bg-white text-sm font-semibold 
              flex items-center justify-center rounded-md hover:shadow-lg`}
              onClick={() =>
                requireAuth(() => {
                  handleNavigation("/friends");
                })
              }
            >
              <div className="relative flex flex-col items-center justify-center">
                <Users />
                <div className="absolute -top-6 -right-6">
                  {user && <FriendsNotification />}
                </div>
              </div>
            </button>
          </div>

          {[
            // {
            //   icon: ChartNoAxesCombined,
            //   path: "/recruiters",
            //   name: "Recruiters",
            //   isProtected: true,
            // },
            {
              icon: BriefcaseBusiness,
              path: "/blogs",
              name: "About",
              isProtected: true,
            },
            {
              icon: Handshake,
              path: "/jobs",
              name: "Jobs",
              isProtected: true,
              hideOnTab: true,
            },
            {
              icon: School,
              path: "/study-in-japan",
              name: "Japanese Schools",
              isProtected: true,
              hideOnTab: true,
            },
            {
              icon: Orbit,
              path: "/jlpt-quiz",
              name: "Japanese Quiz",
              isProtected: false,
            },
            {
              icon: BookOpen,
              path: "/notes",
              name: "Notes",
              isProtected: true,
              hideOnTab: true,
            },
            {
              icon: Dices,
              path: "/games",
              name: "Games",
              isProtected: false,
            },
            {
              icon: TvMinimalPlay,
              path: "/videos",
              name: "Videos",
              isProtected: false,
            },
          ].map(({ icon: Icon, path, name, isProtected, hideOnTab }) => {
            const isActive = pathname === path;
            return (
              <button
                onClick={() => {
                  if (isProtected) {
                    requireAuth(() => {
                      handleNavigation(path);
                      closeStudyBox();
                    });
                  } else {
                    handleNavigation(path);
                    closeStudyBox();
                  }
                }}
                key={name}
                className={`p-3 w-16 cursor-pointer dark:font-normal ${
                  isActive
                    ? "bg-white dark:bg-[rgb(55,55,55)] shadow-lg"
                    : "bg-transparent"
                } dark:hover:bg-[rgb(55,55,55)] hover:bg-white text-sm font-semibold  ${hideOnTab ? " hidden lg:block" : ""}
                flex items-center justify-center rounded-md hover:shadow-lg`}
              >
                <div className="flex flex-col items-center justify-center">
                  <Icon />
                </div>
              </button>
            );
          })}
        </div>

        <div className="shrink-0 mx-4 md:ml-2">
          <LangToggleBtn />
        </div>

        <div className="shrink-0 mx-2">
          {user && <UserMenu handleLogout={handleLogout} />}
        </div>
      </div>

      {isPending && <Spinner />}
    </header>
  );
};

export default Navbar;
