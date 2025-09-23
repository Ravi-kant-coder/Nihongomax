"use client";
import { useState, useEffect } from "react";
import ChatUser from "./ChatUser";
import { getAllUsers } from "@/service/user.service";

const ChatList = ({ activeChatId, onSelectUser }) => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const result = await getAllUsers();
        setUserList(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="h-full overflow-y-auto dark:bg-[rgb(20,20,20)]">
      {userList.map((user) => (
        <div
          key={user?._id}
          onClick={() => onSelectUser(user)}
          className={`cursor-pointer ${
            activeChatId === user._id ? "bg-amber-50 dark:bg-gray-800" : ""
          }`}
        >
          <ChatUser
            user={user}
            hrefLink={user?._id}
            isActive={activeChatId === user?._id}
          />
        </div>
      ))}
    </div>
  );
};
export default ChatList;
