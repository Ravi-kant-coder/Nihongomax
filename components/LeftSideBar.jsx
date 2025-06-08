"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Home,
  MessageCircle,
  Users,
  School,
  BriefcaseBusiness,
  Dices,
  Handshake,
  ChartNoAxesCombined,
  TvMinimalPlay,
} from "lucide-react";
import useSidebarStore from "../app/store/sidebarStore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const LeftSideBar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();
  const router = useRouter();

  const handleNavigation = (path, item) => {
    router.push(path);
  };

  return (
    <aside
      className={`h-full w-64 p-4 transform transition-transform duration-400 ease-in-out md:translate-x-0 flex flex-col z-50 md:z-0 ${
        isSidebarOpen
          ? "translate-x-0 bg-white shadow-lg dark:bg-background"
          : "-translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col overflow-y-auto">
        <nav className="space-y-4 flex-grow">
          <div
            onClick={() => {
              handleNavigation("/user-profile");
            }}
            className="flex items-center bg-accent group space-x-2 cursor-pointer dark:bg-[rgb(55,55,55)] dark:hover:bg-[rgb(15,15,15)] hover:bg-white p-1 rounded-md"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage />
              <AvatarFallback className="font-semibold text-lg dark:bg-gray-500 bg-gray-200 dark:text-white group-hover:bg-gray-300">
                G
              </AvatarFallback>
            </Avatar>
            <span className="font-semibold">Simran Kaur</span>
          </div>
          {[
            {
              id: 1,
              label: "Home",
              navPath: "/",
              icon: Home,
              className: "mr-4 w-4 h-4",
            },
            {
              id: 2,
              label: "Friends",
              navPath: "/friends-list",
              icon: Users,
              className: "mr-4 w-4 h-4",
            },
            {
              id: 3,
              label: "Messages",
              navPath: "/",
              icon: MessageCircle,
              className: "mr-4 w-4 h-4",
            },
            {
              id: 4,
              label: "Notifications",
              navPath: "/",
              icon: Bell,
              className: "mr-4 w-4 h-4",
            },
            {
              id: 5,
              label: "Videos",
              navPath: "/videos",
              icon: TvMinimalPlay,
              className: "mr-4 w-4 h-4",
            },
            {
              id: 6,
              label: "About Jobs in Japan",
              navPath: "/",
              icon: BriefcaseBusiness,
              className: "mr-4 w-4 h-4",
            },
            {
              id: 7,
              label: "Schools in Japan",
              navPath: "/",
              icon: School,
              className: "mr-4 w-4 h-4",
            },
            {
              id: 8,
              label: "Kanji Games",
              navPath: "/games",
              icon: Dices,
              className: "mr-4 w-4 h-4",
            },
            {
              id: 9,
              label: "Apply for Jobs",
              navPath: "/",
              icon: Handshake,
              className: "mr-4 w-4 h-4",
            },
            {
              id: 10,
              label: "For Recruiters",
              navPath: "/",
              icon: ChartNoAxesCombined,
              className: "mr-4 w-4 h-4",
            },
          ].map(({ id, label, icon: Icon, className, navPath }) => (
            <motion.button
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-full cursor-pointer dark:font-normal dark:hover:bg-[rgb(55,55,55)] text-sm font-semibold flex items-center justify-start hover:bg-accent p-2 rounded-md"
              onClick={() => {
                handleNavigation(navPath);
              }}
              key={id}
            >
              <Icon className={className} />
              {label}
            </motion.button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default LeftSideBar;
