"use client";
import { useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Spinner from "../Spinner";
import {
  Handshake,
  ChartNoAxesCombined,
  BookOpen,
  Check,
  SmilePlus,
} from "lucide-react";

const TryWithoutLogin = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleNavigation = (path) => {
    startTransition(() => {
      // If it's a free-class static HTML page → open in a new tab
      if (path.startsWith("/free-classes")) {
        window.open(path, "_blank", "noopener,noreferrer");
      } else {
        router.push(path);
      }
    });
  };

  const pathname = usePathname();

  return (
    <>
      <aside
        className="h-full md:p-2 flex flex-col border rounded-lg
      space-y-2 flex-grow overflow-y-auto border-gray-600"
      >
        <div className="flex items-center space-x-2 p-1">
          <Check size={35} color="#024526" strokeWidth={3.5} />{" "}
          <p className="font-semibold text-green-900 text-2xl">
            Try Without Login
          </p>
        </div>
        {[
          {
            id: 1,
            label: "About JLPT/NAT",
            navPath: "/",
            icon: BookOpen,
          },
          {
            id: 2,
            label: "N5 Class 1",
            navPath: "/friends",
            icon: BookOpen,
          },
          {
            id: 3,
            label: "N4 Class 1",
            navPath: "/about-jobs",
            icon: BookOpen,
          },
          {
            id: 4,
            label: "N3 Class 1",
            navPath: "/schools-in-japan",
            icon: BookOpen,
          },
          {
            id: 5,
            label: "N2 Class 1",
            navPath: "/notes",
            icon: BookOpen,
          },
          {
            id: 6,
            label: "N1 Class 1",
            navPath: "/games",
            icon: BookOpen,
          },
          {
            id: 7,
            label: "About Biz Japanese",
            navPath: "/jobs",
            icon: ChartNoAxesCombined,
          },
          {
            id: 8,
            label: "Basic Biz Class 11",
            navPath: "/recruiters",
            icon: ChartNoAxesCombined,
          },
          {
            id: 9,
            label: "Inter Biz Class 31",
            navPath: "/recruiters",
            icon: ChartNoAxesCombined,
          },
          {
            id: 10,
            label: "Advance Biz Class 61",
            navPath: "/recruiters",
            icon: ChartNoAxesCombined,
          },
          {
            id: 11,
            label: "Kaiwa Class 1",
            navPath: "/recruiters",
            icon: SmilePlus,
          },
          {
            id: 12,
            label: "ビジネス英語について",
            navPath: "/recruiters",
            icon: Handshake,
          },
          {
            id: 13,
            label: "初級クラス 1",
            navPath: "/recruiters",
            icon: Handshake,
          },
          {
            id: 14,
            label: "中級クラス 1",
            navPath: "/recruiters",
            icon: Handshake,
          },
          {
            id: 15,
            label: "上級クラス 1",
            navPath: "/recruiters",
            icon: Handshake,
          },
          {
            id: 16,
            label: "英会話上級",
            navPath: "/recruiters",
            icon: Handshake,
          },
        ].map(({ id, label, icon: Icon, navPath }) => {
          const isActive = pathname === navPath;
          return (
            <motion.button
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`w-full cursor-pointer dark:font-normal ${
                isActive
                  ? "bg-white dark:bg-[rgb(55,55,55)] shadow-lg"
                  : "bg-transparent"
              } hover:bg-white text-sm font-semibold 
                flex items-center bg- justify-start p-2 rounded-md hover:shadow-lg`}
              onClick={() => {
                handleNavigation(navPath);
              }}
              key={id}
            >
              <Icon className="mr-2 w-5 h-5 dark:text-black" />
              <p className="text-xl text-gray-800">{label}</p>
            </motion.button>
          );
        })}
      </aside>
      {isPending && (
        <div
          className="flex items-center justify-center bg-white/30
        dark:bg-black/60 backdrop-blur-xs z-[9999] "
        >
          <Spinner />
        </div>
      )}
    </>
  );
};
export default TryWithoutLogin;
