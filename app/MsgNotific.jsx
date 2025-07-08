"use client";
import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowBigRight, X } from "lucide-react";
import useMsgStore from "@/store/useMsgStore";
import useNotificationStore from "@/store/useNotificationStore";
const unreadmsgs = [
  {
    imageUrl: "/Horizontal1.jpg",
    key: "1",
    username: "Kumar shanu",
  },
  {
    imageUrl: "/Girl.jpg",
    key: "2",
    username: "Sahanubhuti Sharmasmjda",
  },
  {
    imageUrl: "/Horizontal1.jpg",
    key: "3",
    username: "Kumar shanu",
  },
  {
    imageUrl: "/Girl.jpg",
    key: "4",
    username: "Sahanubhuti Sharmasmjda",
  },
  {
    imageUrl: "/Horizontal1.jpg",
    key: "5",
    username: "Kumar shanu",
  },
  {
    imageUrl: "/Girl.jpg",
    key: "6",
    username: "Sahanubhuti Sharmasmjda",
  },
];
const MsgNotific = () => {
  const { openMsgBox } = useMsgStore();
  const { closeNotificationBox } = useNotificationStore();
  const [openIndex, setOpenIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState("");

  const dropdownRef = useRef(null);
  const buttonRefs = useRef([]);

  const handleXClick = (index, username) => {
    setSelectedUsername(username);
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="overflow-y-auto space-y-2">
      {unreadmsgs.map((msg, index) => (
        <div
          key={msg.key}
          onClick={() => {
            openMsgBox();
            closeNotificationBox();
          }}
          className="cursor-pointer rounded hover:bg-gray-100 flex items-center mx-2 p-1
          relative group dark:hover:bg-[rgba(20,20,20,0.7)]"
        >
          <Avatar className="cursor-pointer h-12 w-12 mr-2 hover:ring-2 hover:ring-black hover:ring-offset-1">
            <AvatarImage src={msg.imageUrl} className="object-cover" />
            <AvatarFallback className="bg-gray-400 text-2xl dark:bg-gray-500 text-black">
              {msg.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="w-1/2">
            <p className="truncate font-semibold">{msg.username}</p>
            <p className="text-xs truncate">
              Hi, how are you? Hi, how are you? Hi, how are you?
            </p>
          </div>

          <div className="absolute right-2">
            <div className="relative ">
              <button
                className=" bg-[rgba(38,38,23,0.25)] dark:bg-[rgb(20,20,20)] 
                  hover:bg-[rgba(38,38,23,0.5)] dark:hover:bg-black p-1
                  cursor-pointer rounded flex items-center justify-center"
              >
                View
                <ArrowBigRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MsgNotific;
