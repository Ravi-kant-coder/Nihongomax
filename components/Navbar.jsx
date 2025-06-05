"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import JapanGate from "./JapanGate";
// import useSidebarStore from "../store/sidebarStore";
import { useRouter } from "next/navigation";
import UserMenu from "@/components/UserMenu";
import { Home, Users, Menu, Bell, MessageCircle } from "lucide-react";
import SearchInNav from "./SearchInNav";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  // const { toggleSidebar } = useSidebarStore();
  const router = useRouter();
  const handleNavigation = (path, item) => {
    router.push(path);
  };
  return (
    <header className="lg:dark:bg-[rgb(55,55,55)] lg:bg-accent bg-gray-300 dark:bg-black lg:shadow-lg py-3 fixed top-0 left-0 right-0 z-50 p-2 mx-auto flex justify-between items-center">
      <div className=" hidden lg:flex">
        <a href={"https://www.learnjapanesedelhi.com/"} target="_blank">
          <JapanGate />
        </a>

        <div className="relative">
          <SearchInNav />
        </div>
      </div>
      <div className="hidden md:flex items-center justify-between gap-2 w-1/2 ">
        <motion.div
          whileHover={{ x: 8 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <a href={"https://www.learnjapanesedelhi.com/"} target="_blank">
            <div className="shadow-lg p-2 dark:font-normal px-3 font-semibold rounded-sm font-[Poppins] bg-[rgb(100,100,100)] text-white dark:bg-black">
              <h1>Nihongomax 7678461209</h1>
            </div>
          </a>
        </motion.div>
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
      <div className="flex md:space-x-4 items-center">
        <Button
          variant="ghost"
          className="md:hidden lg:hidden text-gray-600 cursor-pointer"
          // onClick={toggleSidebar}
        >
          <Menu />
        </Button>
        <UserMenu />
      </div>
    </header>
  );
};

export default Navbar;
