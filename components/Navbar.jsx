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
  Menu,
  Bell,
  MessageCircle,
  ChartNoAxesCombined,
  TvMinimalPlay,
  Handshake,
  School,
  Dices,
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
    <header className="dark:bg-black bg-gray-300 md:shadow-lg py-3 fixed top-0 left-0 right-0 z-50 p-2 lg:mx-auto flex items-center  justify-around">
      <div className="hidden lg:flex">
        <a href={"https://www.learnjapanesedelhi.com/"} target="_blank">
          <JapanGate />
        </a>
      </div>

      <div className="relative">
        <SearchInNav />
      </div>
      <div className="flex items-center md:w-3/4 justify-between ">
        <div>
          <a href={"https://www.learnjapanesedelhi.com/"} target="_blank">
            <div className="text-sm hidden md:flex rounded bg-[rgb(60,60,60)] dark:bg-[rgb(55,55,55)]  hover:bg-black p-2 text-white dark:hover:bg-[rgb(35,35,35)]">
              <h1>Nihongomax 7678461209</h1>
            </div>
          </a>
        </div>
        <div className="flex items-center justify-between ">
          {[
            { icon: Home, path: "/", name: "Home" },
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
        </div>
        <div className="md:flex items-center justify-center hidden">
          {[
            { icon: School, path: "/schools", name: "schls" },
            { icon: Handshake, path: "/jobs", name: "Jobs" },
            { icon: Dices, path: "/games", name: "Games" },
            {
              icon: ChartNoAxesCombined,
              path: "/recruiters",
              name: "Rcrutrs",
            },
            { icon: Menu, path: "/", name: "Menu" },
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
        <UserMenu />
      </div>
    </header>
  );
};

export default Navbar;
