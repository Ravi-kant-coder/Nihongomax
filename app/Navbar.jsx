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
    <header className="fixed dark:bg-black md:py-2 py-1 bg-gray-200 md:shadow-lg top-0 left-0 right-0 z-50 p-2 lg:mx-auto flex items-center justify-between">
      <div className="hidden md:block">
        <a href={"https://www.learnjapanesedelhi.com/"} target="_blank">
          <JapanGate />
        </a>
      </div>
      <div className="md:flex w-full items-center justify-between">
        {/* -----------------------Search Bar and Institute website Link --------------------------   */}

        <div className="flex items-center justify-between mb-5 md:mb-0 ">
          {user ? <SearchBar /> : <SearchBarPseudo />}
          <div>
            <a href="https://www.learnjapanesedelhi.com/" target="_blank">
              <div
                className="relative overflow-hidden text-sm hidden md:flex items-center bg-[rgb(60,60,60)] dark:bg-[rgb(55,55,55)]
              hover:bg-black md:p-2 p-1 text-white dark:hover:bg-[rgb(35,35,35)] rounded"
              >
                <Car
                  size={20}
                  className="absolute top-5 jet-animation"
                  fill="green"
                />

                <h1 className="relative z-10">{t("visit")} Nihongomax</h1>
              </div>
            </a>
          </div>

          {/* -----------------------(On Mobile)---------------   */}

          <div className="md:hidden flex items-center justify-center">
            <UserMenu />
          </div>
        </div>

        {/* -----------------------Navbar Buttons--------------- -----  */}
        <div className="flex justify-between items-center md:mt-0 mt-2">
          <div className="md:flex items-center justify-center hidden ">
            <button
              onClick={() => {
                handleNavigation("/");
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
              onClick={() =>
                requireAuth(() => {
                  handleNavigation("/friends");
                })
              }
            >
              <div className="relative">
                <Users />
                <div className="absolute -top-6 -right-6">
                  {user && <FriendsNotification />}
                </div>
              </div>
            </button>
          </div>
          {[
            {
              icon: ChartNoAxesCombined,
              path: "/recruiters",
              name: "Recruiters",
              isProtected: true,
            },
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
            },
            {
              icon: School,
              path: "/study-in-japan",
              name: "Schools",
              isProtected: true,
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
          ].map(({ icon: Icon, path, name, isProtected }) => {
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
            {user && <UserMenu handleLogout={handleLogout} />}
          </div>
        </div>
      </div>
      {isPending && <Spinner />}
    </header>
  );
};

export default Navbar;
