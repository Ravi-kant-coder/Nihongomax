import { useRef, useEffect, useTransition } from "react";
import { X, Send, Paperclip, Smile, SendHorizonal } from "lucide-react";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import useMsgStore from "@/stores/useMsgStore";
import useChatStore from "@/stores/useChatStore";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter, usePathname } from "next/navigation";
import Spinner from "./Spinner";

const oneTest = [
  {
    imageUrl: "/Circular.jpg",
    from: "me",
    key: 1,
  },
  {
    imageUrl: "/Horizontal1.jpg",
    from: "other",
    key: 2,
  },
  {
    imageUrl: "/Vertical1.jpg",
    from: "me",
    key: 3,
  },
  {
    imageUrl: "/Horizontal2.jpg",
    from: "other",
    key: 4,
  },
  {
    imageUrl: "/Girl.jpg",
    from: "me",
    key: 5,
  },
  {
    imageUrl: "/logo.png",
    from: "other",
    key: 6,
  },
  {
    imageUrl: "/Vertical2.jpg",
    from: "other",
    key: 7,
  },
  {
    imageUrl: "/Horizontal2.jpg",
    from: "other",
    key: 8,
  },
];

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
const OneChat = ({ chatId }) => {
  const { closeChat } = useChatStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const dummyMessages = [
    { id: 1, text: "Pehla Nasha", timestamp: "10:13 AM", from: "other" },
    {
      id: 2,
      text: "Konnichiwa! How’s your study going?",
      timestamp: getCurrentTime(),
      from: "other",
    },
    {
      id: 3,
      text: "My problem is this Kanji. Can you tell me it's meaning? 新幹線",
      timestamp: getCurrentTime(),
      from: "other",
    },
    {
      id: 4,
      text: "Ye Shinkansen ki kanji hai chutiye",
      timestamp: "10:13 AM",
      from: "me",
    },
    {
      id: 5,
      text: "Konnichiwa! How’s your study going?",
      timestamp: getCurrentTime(),
      from: "me",
    },
    {
      id: 7,
      text: "My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 ",
      timestamp: "10:13 AM",
      from: "other",
    },
    {
      id: 8,
      text: "My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 My problem is this Kanji. Can you tell me it's meaning? 新幹線 ",
      timestamp: "10:13 AM",
      from: "me",
    },
    { id: 9, text: "Hey there!", timestamp: getCurrentTime(), from: "other" },
    {
      id: 10,
      text: "Konnichiwa! How’s your study going?",
      timestamp: "10:13 AM",
      from: "me",
    },
    { id: 11, text: "Hi!", timestamp: getCurrentTime(), from: "me" },
    {
      id: 12,
      text: "How are you?",
      timestamp: getCurrentTime(),
      from: "other",
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
                <AvatarImage src={oneTest?.imageUrl} className="object-cover" />
                <AvatarFallback
                  className="bg-gray-400 text-2xl dark:bg-gray-500
                     text-black"
                >
                  S
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
        {/* ----------------Messages----------------- */}
        <div
          className="mt-20 mb-2 space-y-2 overflow-y-auto h-full 
           px-2 bg-zinc-200 self-end dark:bg-[rgb(20,20,20)]"
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
              justify-end"
              >
                <p>{msg.timestamp}</p>
              </span>
            </div>
          ))}
          {/* ------------------------Images-------------------- */}
          {oneTest.map((image) => (
            <div
              className={clsx(
                "relative w-full flex", // allow alignment
                image.from === "me" ? "justify-end" : "justify-start"
              )}
            >
              <div className="relative w-fit max-w-xs">
                <img
                  src={image.imageUrl}
                  alt="Sent"
                  className={clsx(
                    "rounded-lg h-auto max-h-60 object-cover w-[85%]",
                    image.from === "me" ? "ml-auto" : "mr-auto"
                  )}
                />
                <p
                  className="absolute bottom-0 right-5 bg-black/60 text-white text-[10px] 
            px-1.5 py-0.5 rounded"
                >
                  10:15 PM
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

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
