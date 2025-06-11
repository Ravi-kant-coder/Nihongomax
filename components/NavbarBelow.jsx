"use client";
import { Button } from "@/components/ui/button";
// import useSidebarStore from "../store/sidebarStore";
import { useRouter } from "next/navigation";
import {
  Menu,
  ChartNoAxesCombined,
  Handshake,
  School,
  Dices,
} from "lucide-react";
import SearchInNav from "./SearchInNav";

const NavbarBelow = () => {
  // const { toggleSidebar } = useSidebarStore();
  const router = useRouter();
  const handleNavigation = (path, item) => {
    router.push(path);
  };
  return (
    <header className="lg:hidden md:hidden bg-gray-300 h-12 dark:bg-black lg:shadow-lg fixed bottom-0 left-0 right-0 z-50 flex justify-between items-center">
      <div className="lg:hidden md:hidden flex items-center justify-center">
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
            className="md:p-3 text-xs hover:bg-white rounded-md dark:hover:bg-black cursor-pointer"
          >
            <div className="flex md:w-12 flex-col items-center justify-center">
              <Icon />
              <p className="md:mt-1">{name}</p>
            </div>{" "}
          </Button>
        ))}
      </div>
    </header>
  );
};

export default NavbarBelow;
