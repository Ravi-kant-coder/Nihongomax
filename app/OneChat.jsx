import { useRef, useEffect, useTransition } from "react";
import {
  X,
  Send,
  Paperclip,
  Smile,
  CheckCheck,
  Check,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import useMsgStore from "@/store/useMsgStore";
import useChatStore from "@/store/useChatStore";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter, usePathname } from "next/navigation";
import useImageModal from "@/store/useImageModal";
import ImagePreviewModal from "./ImagePreviewModal";
import Spinner from "./Spinner";

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
const OneChat = ({ chatId }) => {
  const { closeChat } = useChatStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const dummyMessages = [
    {
      id: 1,
      text: "Pehla Nasha",
      timestamp: "10:13 AM",
      from: "me",
      status: "sent",
    },
    {
      id: 2,
      text: "Konnichiwa! How’s your study going?",
      timestamp: getCurrentTime(),
      from: "other",
      status: "delivered",
    },
    {
      id: 3,
      text: "My problem is this Kanji. Can you tell me it's meaning? 新幹線",
      timestamp: getCurrentTime(),
      from: "other",
      status: "seen",
    },
    {
      id: 4,
      text: "Ye Shinkansen ki kanji hai chutiye",
      timestamp: "10:13 AM",
      from: "me",
      status: "seen",
    },
    {
      id: 5,
      text: "Konnichiwa! How’s your study going?",
      timestamp: getCurrentTime(),
      from: "me",
      status: "mada",
    },
    {
      id: 6,
      text: "My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 ",
      timestamp: "10:13 AM",
      from: "other",
      status: "delivered",
    },
    {
      id: 7,
      text: "My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 ",
      timestamp: "10:13 AM",
      from: "me",
      status: "seen",
    },
    { id: 8, text: "Hey there!", timestamp: getCurrentTime(), from: "other" },
    {
      id: 9,
      text: "Konnichiwa! How’s your study going?",
      timestamp: "10:13 AM",
      from: "me",
      status: "sent",
    },
    {
      id: 10,
      text: "Hi!",
      timestamp: getCurrentTime(),
      from: "me",
      status: "sent",
    },
    {
      id: 11,
      text: "How are you?",
      timestamp: getCurrentTime(),
      from: "other",
      status: "seen",
    },
  ];
  const imageTest = [
    {
      imageUrl: "/Circular.jpg",
      from: "me",
      key: 1,
      timestamp: getCurrentTime(),
      status: "seen",
      uploaded: true,
    },

    {
      imageUrl: "/Vertical1.jpg",
      from: "me",
      key: 3,
      timestamp: getCurrentTime(),
      status: "seen",
      uploaded: true,
    },
    {
      imageUrl: "/Horizontal2.jpg",
      from: "other",
      key: 4,
      timestamp: getCurrentTime(),
      status: "mada",
      uploaded: false,
    },
    {
      imageUrl: "/Girl.jpg",
      from: "me",
      key: 5,
      timestamp: getCurrentTime(),
      status: "sent",
      uploaded: true,
    },
    {
      imageUrl: "/Horizontal1.jpg",
      from: "other",
      key: 6,
      timestamp: getCurrentTime(),
      status: "mada",
      uploaded: true,
    },
  ];

  const handleNavigation = (path) => {
    startTransition(() => {
      router.push(path);
    });
  };
  const {
    isMsgBoxOpen,
    closeMsgBox,
    toggleMsgBox,
    resetUnread,
    incrementUnread,
  } = useMsgStore();

  const bottomRef = useRef(null);
  useEffect(() => {
    if (isMsgBoxOpen) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [isMsgBoxOpen]);

  if (!isMsgBoxOpen) return null;

  return (
    <div className="flex flex-col bg-zinc-200 h-full dark:bg-[rgb(20,20,20)]">
      <div>
        {/* ------------DP section Above -------------*/}
        <div
          className="absolute rounded-t-md w-full overflow-hidden flex items-center z-10
          justify-between py-2 bg-white dark:bg-black border-b"
        >
          <div className="flex items-center ">
            <button
              className="text-gray-700 cursor-pointer rounded-full hover:bg-gray-200 p-2
                dark:text-white dark:bg-gray-900 bg-gray-100"
              onClick={() => {
                closeChat();
              }}
            >
              <ArrowLeft />
            </button>
            <div
              onClick={() => {
                handleNavigation("/user-profile");
                closeMsgBox();
              }}
              className="flex items-center cursor-pointer dark:hover:bg-[rgb(55,55,55)]
               hover:bg-gray-200 py-1 pr-1 rounded-md"
            >
              <Avatar className="cursor-pointer h-12 w-12 mr-1">
                <AvatarImage src={chatId} className="object-cover" />
                <AvatarFallback
                  className="bg-gray-400 text-2xl dark:bg-gray-500
                     text-black"
                >
                  {chatId[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-lg">{chatId}</span>
            </div>
          </div>
          <button
            onClick={closeMsgBox}
            className="bg-[rgba(23,23,23,0.5)] dark:bg-[rgb(0,30,30)] hover:bg-black
               text-white p-1 mr-4 dark:hover:bg-black cursor-pointer border-2
                border-white/80 dark:border-[rgb(200,200,200)] rounded-lg top-1 z-50"
          >
            <X className="w-7 h-7" />
          </button>
        </div>
        {/* -----------------------Messages--------------------- */}
        <div
          className="mt-20 mb-2 space-y-2 overflow-y-auto h-full 
           px-2 bg-zinc-200 self-end dark:bg-zinc-900"
        >
          {dummyMessages.map((msg) => (
            <div
              key={msg.id}
              className={clsx(
                "max-w-xs px-2 pb-1 pt-2 mx-2 rounded-lg text-sm w-fit",
                msg.from === "me"
                  ? "ml-auto bg-green-300 dark:bg-green-900 "
                  : "mr-auto bg-white dark:bg-zinc-800 dark:text-white"
              )}
            >
              {msg.text}
              <span
                className="text-[12px] text-gray-700 dark:text-gray-400 right-0 flex 
              justify-end items-center"
              >
                <p>{msg.timestamp}</p>
                {msg.from === "me" && (
                  <p className="ml-1">
                    {msg.status === "mada" && <Clock size={13} />}
                    {msg.status === "sent" && <Check size={18} />}
                    {msg.status === "delivered" && <CheckCheck size={18} />}
                    {msg.status === "seen" && (
                      <span className="text-blue-600">
                        <CheckCheck size={18} />
                      </span>
                    )}
                  </p>
                )}
              </span>
            </div>
          ))}
          {/* ------------------------Images-------------------- */}
          {imageTest.map((image) => (
            <div
              key={image.key}
              className={clsx(
                "relative w-full flex", // allow alignment
                image.from === "me" ? "justify-end" : "justify-start"
              )}
            >
              <div className="relative w-fit max-w-xs">
                <img
                  onClick={() =>
                    useImageModal.getState().openModal(image.imageUrl)
                  }
                  src={image.imageUrl}
                  alt="Sent"
                  className={clsx(
                    "rounded-lg h-auto max-h-60 object-cover w-[85%] cursor-pointer",
                    image.from === "me" ? "ml-auto" : "mr-auto",
                    !image.uploaded && "blur-xs opacity-80"
                  )}
                />
                {!image.uploaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="h-6 w-6 border-2 border-white border-t-transparent 
                    animate-spin rounded-full"
                    />
                  </div>
                )}
                <div
                  className={clsx(
                    "absolute bottom-0 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center",
                    image.from === "me" ? "right-1" : "left-1"
                  )}
                >
                  <p>{image.timestamp}</p>
                  {image.from === "me" && (
                    <p className="ml-1">
                      {image.status === "mada" && <Clock size={13} />}
                      {image.status === "sent" && <Check size={18} />}
                      {image.status === "delivered" && <CheckCheck size={18} />}
                      {image.status === "seen" && (
                        <span className="text-blue-600">
                          <CheckCheck size={18} />
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ImagePreviewModal />
      <div ref={bottomRef} />
      {/* --------------------Input section--------------- */}
      <div
        className="px-3 absolute w-full rounded-b-md bottom-0 py-5 bg-white border-t
      dark:bg-black flex items-center gap-2"
      >
        <Smile className="cursor-pointer" />
        <Input
          placeholder="Message..."
          className="flex-1 bg-white border border-gray-400 dark:bg-zinc-900 text-sm"
        />
        <Paperclip className="cursor-pointer" />
        <button
          className="border hover:bg-gray-800 bg-black px-4 dark:bg-gray-300
            py-2 rounded-lg cursor-pointer text-white dark:text-black relative"
        >
          <Send size={20} fill="black" />
        </button>
      </div>
    </div>
  );
};

export default OneChat;
