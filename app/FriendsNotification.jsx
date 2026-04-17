"use client";
import { useEffect } from "react";
import userStore from "@/store/userStore";
import { userFriendStore } from "@/store/userFriendsStore";

const FriendsNotification = () => {
  const { user } = userStore();
  const { friendRequest, fetchFriendRequest } = userFriendStore();

  useEffect(() => {
    fetchFriendRequest();
  }, []);

  return (
    <>
      {user && friendRequest.length > 0 && (
        <div className="absolute right-2 top-2 bg-green-700 text-white text-xs rounded-full p-1 px-2">
          {friendRequest.length <= 99 ? friendRequest.length : "99+"}
        </div>
      )}
    </>
  );
};
export default FriendsNotification;
