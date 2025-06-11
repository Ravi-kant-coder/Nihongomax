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
      <div className="md:flex w-full items-center">
        <div className="flex justify-between">
          {" "}
          <SearchInNav />
          <a href={"https://www.learnjapanesedelhi.com/"} target="_blank">
            <div className="text-sm hidden md:block rounded bg-[rgb(60,60,60)] dark:bg-[rgb(55,55,55)]  hover:bg-black md:p-2 p-1 text-white dark:hover:bg-[rgb(35,35,35)]">
              <h1> Nihongomax 7678461209</h1>
            </div>
          </a>
          <div className="md:hidden">
            <UserMenu />
          </div>
        </div>{" "}
        <div className="flex justify-between items-center md:mt-0 mt-2">
          {[
            { icon: ChartNoAxesCombined, path: "/recruiters", name: "Rcrutrs" },
            { icon: Users, path: "/friends", name: "Frnds" },
            { icon: MessageCircle, path: "/messages", name: "Msgs" },
            { icon: Bell, path: "/notifications", name: "Ntfctns" },
            { icon: TvMinimalPlay, path: "/videos", name: "Vids" },
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
              { icon: School, path: "/schools", name: "schls" },
              { icon: Handshake, path: "/jobs", name: "Jobs" },
              { icon: Home, path: "/games", name: "Home" },
              {
                icon: ChartNoAxesCombined,
                path: "/recruiters",
                name: "Rcrutrs",
              },
              { icon: Briefcase, path: "/jobs-in-japan", name: "Jap Jobs" },
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
