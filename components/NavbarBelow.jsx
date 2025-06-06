"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
// import useSidebarStore from "../store/sidebarStore";
import { useRouter } from "next/navigation";
import { Home, Users, Menu, Bell, MessageCircle } from "lucide-react";
import SearchInNav from "./SearchInNav";

const NavbarBelow = () => {
  // const { toggleSidebar } = useSidebarStore();
  const router = useRouter();
  const handleNavigation = (path, item) => {
    router.push(path);
  };
  return (
    <header className="lg:hidden md:hidden lg:dark:bg-[rgb(55,55,55)] lg:h-fit h-12 bg-pink-300 lg:bg-gray-300 dark:bg-black lg:shadow-lg py-3 fixed bottom-0 left-0 right-0 z-50 p-2 mx-auto flex justify-between items-center">
      <div className=" hidden lg:flex">
        <div className="relative">
          <SearchInNav />
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 w-1/2 ">
        {[
          { icon: Home, path: "/", name: "home" },
          { icon: Users, path: "/friends-list", name: "friends" },
          { icon: MessageCircle, path: "/", name: "messages" },
          { icon: Bell, path: "/", name: "notifications" },
        ].map(({ icon: Icon, path, name }) => (
          <Button
            onClick={() => {
              handleNavigation(path);
            }}
            key={name}
            variant="ghost"
            className="relative hover:shadow-lg hover:bg-white cursor-pointer"
          >
            <Icon />
          </Button>
        ))}
      </div>
    </header>
  );
};

export default NavbarBelow;
