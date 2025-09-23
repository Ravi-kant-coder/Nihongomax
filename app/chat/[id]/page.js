"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatPage() {
  const { id } = useParams();
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeUser, setActiveUser] = useState(null);

  return (
    <div
      className="flex md:h-165 h-130 bg-gray-100 dark:bg-gray-800 relative 
    overflow-hidden md:mt-16 mt-30"
    >
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
              className="absolute z-50 w-3/4 h-full bg-white border-r shadow-lg md:hidden"
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

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {activeUser ? (
          <ChatWindow chatId={activeUser?._id} peerId={activeUser} />
        ) : (
          <div
            className="flex items-center justify-center h-full text-gray-600
          dark:text-gray-300 text-2xl bg-gray-300"
          >
            Select a name to start messaging
          </div>
        )}
      </div>

      {/* Floating toggle button (only on mobile) */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="md:hidden fixed bottom-40 right-5 bg-green-500 text-black
         p-4 rounded-2xl hover:dark:bg-[rgb(60,60,60)] dark:bg-[rgb(80,80,80)]
          shadow-lg cursor-pointer z-50"
      >
        {showSidebar ? <X size={24} /> : <Plus size={24} />}
      </button>
    </div>
  );
}
