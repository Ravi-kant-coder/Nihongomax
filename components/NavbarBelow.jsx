"use client";
import { Button } from "@/components/ui/button";
// import useSidebarStore from "../store/sidebarStore";
import { useRouter } from "next/navigation";
import { BookOpen, MessageCircle, School, Home, Users } from "lucide-react";
import { useState } from "react";
import MsgBox from "./MsgBox";
import useMsgStore from "@/app/store/useMsgStore";

const NavbarBelow = () => {
  // const [isMsgsBoxOpen, setIsMsgsBoxOpen] = useState(false);
  const { isMsgBoxOpen, toggleMsgBox, unreadCount } = useMsgStore();

  // const { toggleSidebar } = useSidebarStore();
  const router = useRouter();
  const handleNavigation = (path, item) => {
    router.push(path);
  };
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-gray-300 h-15 dark:bg-black  flex justify-around items-center">
        {[
          { icon: School, path: "/schools", name: "schls" },
          { icon: Users, path: "/friends", name: "Frnds" },
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
              <p className="mt-2">{name}</p>
            </div>{" "}
          </Button>
        ))}
        <Button
          variant="ghost"
          onClick={toggleMsgBox}
          className="md:p-3 text-xs hover:bg-white rounded-md dark:hover:bg-[rgb(55,55,55)] cursor-pointer"
        >
          <div className="flex md:w-12 flex-col items-center justify-center">
            <MessageCircle />
            <p className="mt-2">Messages</p>
          </div>{" "}
        </Button>
        {[
          { icon: Home, path: "/", name: "Home" },
          { icon: BookOpen, path: "/", name: "Study" },
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
              <p className="mt-2">{name}</p>
            </div>{" "}
          </Button>
        ))}
      </div>{" "}
      <div className="text-xs rounded bg-gray-300 dark:bg-black dark:text-white text-center">
        <h1>Nihongomax 7678461209</h1>
      </div>
    </div>
  );
};

export default NavbarBelow;
