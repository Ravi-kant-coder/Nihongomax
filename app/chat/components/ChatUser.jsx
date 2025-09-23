import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useRef } from "react";
import Link from "next/link";

const ChatUser = ({ user, isActive, hrefLink }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    if (isActive && itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isActive]);

  const handleSearchUserClick = (userId) => {
    console.log("User clicked:", userId);
  };

  return (
    <Link
      ref={itemRef}
      href={hrefLink ? `${hrefLink}` : "#"}
      onClick={() => handleSearchUserClick(user?._id)}
      className={`flex items-center gap-3 px-4 py-3 m-1 rounded-xl cursor-pointer 
        hover:bg-gray-300 dark:hover:bg-[rgb(30,50,50)] 
        ${isActive ? "bg-gray-300 dark:bg-[rgb(30,50,50)]" : ""}`}
    >
      <Avatar className="flex-shrink-0 w-12 h-12">
        <AvatarImage src={user?.profilePicture} className="object-cover" />
        <AvatarFallback className="bg-gray-400 dark:bg-black capitalize text-2xl">
          {user?.username?.[0]}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <p className="w-[90%] truncate text-lg capitalize">{user?.username}</p>
        <p className="text-sm dark:text-gray-400 text-gray-700 truncate">
          {user?.lastMessage || "No messages"}
        </p>
      </div>
    </Link>
  );
};

export default ChatUser;
