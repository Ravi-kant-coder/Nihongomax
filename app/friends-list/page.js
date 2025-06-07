"use client";
import React, { useEffect, useState } from "react";
import LeftSideBar from "@/components/LeftSideBar";
import { FriendCardSkeleton, NoFriendsMessage } from "@/lib/Skeleten";
import FriendRequest from "./FriendRequestCard";
import FriendsSuggestion from "./FriendsSuggestion";
import FriendRequestCard from "./FriendRequestCard";
// import { userFriendStore } from "@/store/userFriendsStore";
// import toast from "react-hot-toast";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const friendRequests = [{}, {}, {}];
  const friendSuggestion = [{}, {}, {}];
  //   const {
  //     //     followUser,
  //     //     loading,
  //     //     UnfollowUser,
  //     //     fetchFriendRequest,
  //     //     fetchFriendSuggestion,
  //     //     deleteUserFromRequest,
  //     //     fetchMutualFriends,
  //     // friendRequest,
  //     // friendSuggestion,
  //     //     mutualFriends,
  //   } = userFriendStore();

  //   useEffect(() => {
  //     fetchFriendRequest(), fetchFriendSuggestion();
  //   }, []);

  //   const handleAction = async (action, userId) => {
  //     if (action === "confirm") {
  //       toast.success("friend added successfully");
  //       await followUser(userId);
  //       fetchFriendRequest();
  //       fetchFriendSuggestion();
  //     } else if (action === "delete") {
  //       await UnfollowUser(userId);
  //       fetchFriendRequest();
  //       fetchFriendSuggestion();
  //     }
  //   };

  return (
    <div className="min-h-screen bg-gray-300 dark:bg-[rgb(36,37,38)] lg:flex mt-18">
      <div className="hidden lg:fixed lg:block">
        <LeftSideBar />
      </div>
      <main className="p-6 lg:rounded-lg lg:ml-70 mx-4 lg:mx-0">
        <h1 className="text-2xl font-bold mb-6">
          {friendRequests.length > 0 ? "You Received " : "No "}Friends Requests
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {loading ? (
            <FriendCardSkeleton />
          ) : friendRequests.length === 0 ? (
            <NoFriendsMessage
              text="No Friend Requests"
              description="Why not explore Nihongomax and connect with new people?"
            />
          ) : (
            friendRequests.map((friend) => (
              <FriendRequestCard
                key={friend._id}
                friend={friend}
                loading={loading}
                // onAction={handleAction}
              />
            ))
          )}
        </div>

        <h1 className="text-2xl font-bold my-6">People you may know</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {loading ? (
            <FriendCardSkeleton />
          ) : friendSuggestion.length === 0 ? (
            <NoFriendsMessage
              text="No Friends Suggestion"
              description="Why not explore Nihongomax and connect with new people?"
            />
          ) : (
            friendSuggestion.map((friend) => (
              <FriendsSuggestion
                key={friend._id}
                friend={friend}
                loading={loading}
                // onAction={handleAction}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
