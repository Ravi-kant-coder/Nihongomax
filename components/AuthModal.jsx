"use client";
import { useState } from "react";
import useAuthModalStore from "@/store/authModalStore";
import Login from "./Login";
import CreateAcc from "./CreateAcc";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { X } from "lucide-react";

const AuthModal = () => {
  const { isOpen, closeModal } = useAuthModalStore();
  // const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9998 bg-black/50 flex items-center justify-center">
      {/* {/* Later for mobile, Make it a full screen modal and use tabs to switch between login and create account*/}
      {/* <div className="flex justify-between mb-3">
          <div onClick={() => setIsLogin(true)}>Login</div>
          <div onClick={() => setIsLogin(false)}>Create Account</div>
        </div> */}
      <motion.div
        className="flex space-x-2 justify-between relative"
        initial={{ opacity: 0, y: -500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Button
          className="cursor-pointer hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-black bg-gray-400 absolute -top-2 -right-2 z-9999"
          variant="ghost"
          size="icon"
          onClick={closeModal}
        >
          <X className="w-4 h-4" />
        </Button>
        <CreateAcc />
        <Login />
      </motion.div>
    </div>
  );
};
export default AuthModal;
