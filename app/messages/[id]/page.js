"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import { Annoyed, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatPage() {
  const { id } = useParams();
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeUser, setActiveUser] = useState(null);

  return (
    <>
      <h1
        className="md:text-4xl flex text-xl font-semibold dark:text-[rgb(150,150,150)] mb-4 text-[rgb(100,100,100)]
      items-center"
      >
        You can Msg your Friends only
        <Annoyed className="h-11 w-11 ml-4 dark:text-[rgb(150,150,150)] text-[rgb(100,100,100)]" />
      </h1>

      <div
        className="flex h-[70vh] dark:bg-gray-800 relative overflow-hidden rounded-xl
     dark:border-gray-700 shadow-lg w-[80%]"
      >
        {/* Desktop Sidebar */}
        <div
          className="hidden md:block md:w-1/3 border-r dark:border-gray-800
       bg-white"
        >
          <ChatList
            activeChatId={activeUser?._id}
            onSelectUser={(user) => setActiveUser(user)}
          />
        </div>
        {/* Mobile Sidebar + Overlay */}
        <AnimatePresence>
          {showSidebar && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black z-40 md:hidden"
                onClick={() => setShowSidebar(false)}
              />

              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="absolute z-50 w-3/4 h-full bg-white border-r
               shadow-lg md:hidden"
              >
                {/* Mobile close button */}
                <div className="flex justify-end p-2 border-b">
                  <button
                    onClick={() => setShowSidebar(false)}
                    className="p-2 rounded-full hover:bg-gray-200"
                  >
                    <X size={20} />
                  </button>
                </div>
                <ChatList
                  activeChatId={activeUser?._id}
                  onSelectUser={(user) => {
                    setActiveUser(user);
                    setShowSidebar(false);
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <div className="w-full flex flex-col h-full">
          {activeUser ? (
            <ChatWindow user={activeUser} />
          ) : (
            <div
              className="flex items-center justify-center h-full text-gray-600
          dark:text-gray-300 text-2xl bg-gray-200 dark:bg-gray-800"
            >
              Select a Name to Start Messaging
            </div>
          )}
        </div>
        {/* Floating toggle button (only on mobile) */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="md:hidden fixed bottom-40 right-5 bg-blue-500 text-black
         p-4 rounded-2xl hover:dark:bg-[rgb(60,60,60)] dark:bg-[rgb(80,80,80)]
          shadow-lg cursor-pointer z-50"
        >
          {showSidebar ? <X size={24} /> : <Plus size={24} />}
        </button>
      </div>
    </>
  );
}
