"use client";

import { useState } from "react";
import useAuthModalStore from "@/store/authModalStore";
import Login from "./Login";
import CreateAcc from "./CreateAcc";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { X, ArrowLeft } from "lucide-react";
import GoogleBtn from "./GoogleBtn";

const AuthModal = () => {
  const { isOpen, closeModal } = useAuthModalStore();

  const [mobileMode, setMobileMode] = useState(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setMobileMode(null);
    closeModal();
  };

  const handleBack = () => {
    setMobileMode(null);
  };

  return (
    <div className="fixed inset-0 z-9998 bg-black/50 flex items-center justify-center">
      <motion.div
        className="relative w-auto max-w-[95vw]"
        initial={{ opacity: 0, y: -500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {/* Close button */}
        <Button
          className="cursor-pointer hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-black bg-gray-400 
          absolute -top-2 -right-2 z-9999"
          variant="ghost"
          size="icon"
          onClick={handleClose}
        >
          <X className="w-4 h-4" />
        </Button>
        <div className="hidden md:block">
          <div className="flex justify-between space-x-2">
            <CreateAcc />
            <Login />
          </div>

          <GoogleBtn />
        </div>

        <div className="md:hidden w-[90vw] max-w-[360px]">
          <AnimatePresence mode="wait">
            {mobileMode === null && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3 rounded-xl bg-gray-400 dark:bg-gray-900 p-5"
              >
                <Button
                  type="button"
                  onClick={() => setMobileMode("login")}
                  className="w-full h-12 cursor-pointer bg-white text-black hover:bg-gray-200 dark:bg-black dark:text-white dark:hover:bg-gray-800"
                >
                  Login
                </Button>

                <Button
                  type="button"
                  onClick={() => setMobileMode("create")}
                  className="w-full h-12 cursor-pointer bg-white text-black hover:bg-gray-200 dark:bg-black dark:text-white dark:hover:bg-gray-800"
                >
                  Create Account
                </Button>

                <Button
                  type="button"
                  onClick={() => setMobileMode("google")}
                  className="w-full h-12 cursor-pointer bg-white text-black hover:bg-gray-200 dark:bg-black dark:text-white dark:hover:bg-gray-800"
                >
                  Or continue with Google
                </Button>
              </motion.div>
            )}
            {mobileMode === "login" && (
              <motion.div
                key="mobile-login"
                initial={{
                  opacity: 0,
                  height: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.45,
                  ease: "easeInOut",
                }}
                className="overflow-hidden"
              >
                <div className="mb-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleBack}
                    className="text-white cursor-pointer hover:bg-white/10 border border-white"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                </div>

                <Login />
              </motion.div>
            )}

            {mobileMode === "create" && (
              <motion.div
                key="mobile-create"
                initial={{
                  opacity: 0,
                  height: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.45,
                  ease: "easeInOut",
                }}
                className="overflow-hidden"
              >
                <div className="mb-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleBack}
                    className="text-white cursor-pointer hover:bg-white/10 border border-white"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                </div>

                <CreateAcc />
              </motion.div>
            )}

            {mobileMode === "google" && (
              <motion.div
                key="mobile-google"
                initial={{
                  opacity: 0,
                  height: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.45,
                  ease: "easeInOut",
                }}
                className="overflow-hidden rounded-xl bg-gray-400 dark:bg-gray-900 p-5"
              >
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  className="text-white cursor-pointer hover:bg-white/10 mb-2 border border-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>

                <GoogleBtn />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;
