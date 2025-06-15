"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import JapanGate from "./JapanGate";
// import useSidebarStore from "../store/sidebarStore";
import { useRouter } from "next/navigation";
import UserMenu from "@/components/UserMenu";
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
  Briefcase,
  BriefcaseBusiness,
} from "lucide-react";
import SearchInNav from "./SearchInNav";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  // const { toggleSidebar } = useSidebarStore();
  const router = useRouter();
  const handleNavigation = (path, item) => {
    router.push(path);
  };
  return (
    <header className="dark:bg-black md:py-4 bg-gray-300 md:shadow-lg fixed top-0 left-0 right-0 z-50 p-2 lg:mx-auto flex items-center  justify-between">
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
            {[{ icon: Bell, path: "/notifications", name: "Ntfctns" }].map(
              ({ icon: Icon, path, name }) => (
                <Button
                  variant="ghost"
                  onClick={() => {
                    handleNavigation(path);
                  }}
                  key={name}
                  className="md:p-3 text-xs hover:bg-white rounded-md dark:hover:bg-[rgb(55,55,55)] cursor-pointer"
                >
                  <div className="flex md:w-12 flex-col items-center justify-center">
                    <Icon />
                    <p className="mt-2">{name}</p>
                  </div>{" "}
                </Button>
              )
            )}
            <UserMenu />
          </div>
        </div>{" "}
        <div className="flex justify-between items-center md:mt-0 mt-2">
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
          ].map(({ icon: Icon, path, name }) => (
            <Button
              variant="ghost"
              onClick={() => {
                handleNavigation(path);
              }}
              key={name}
              className="md:p-3 text-xs hover:bg-white rounded-md dark:hover:bg-[rgb(55,55,55)] cursor-pointer"
            >
              <div className="flex md:w-12 flex-col items-center justify-center">
                <Icon />
                <p className="mt-2">{name}</p>
              </div>{" "}
            </Button>
          ))}

          <div className="md:flex items-center justify-center hidden">
            {[
              { icon: School, path: "/schools", name: "Jap Schools" },
              { icon: Home, path: "/", name: "Home" },
              { icon: Users, path: "/friends", name: "Friends" },
              { icon: Bell, path: "/notifications", name: "Notifctns" },
              { icon: MessageCircle, path: "/messages", name: "Messages" },
            ].map(({ icon: Icon, path, name }) => (
              <Button
                variant="ghost"
                onClick={() => {
                  handleNavigation(path);
                }}
                key={name}
                className="md:p-3 text-xs hover:bg-white rounded-md dark:hover:bg-[rgb(55,55,55)] cursor-pointer"
              >
                <div className="flex md:w-12 flex-col items-center justify-center">
                  <Icon />
                  <p className="mt-2">{name}</p>
                </div>{" "}
              </Button>
            ))}
          </div>
          <div className="hidden md:block">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
