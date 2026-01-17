"use client";
import React, { useEffect, useState } from "react";
import { FriendCardSkeleton, NoFriendsMessage } from "@/lib/Skeleten";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FriendRequestCard from "./FriendRequestCard";
import FriendsSuggestion from "./FriendsSuggestion";
import { userFriendStore } from "@/store/userFriendsStore";
import ScrollupBtn from "../ScrollupBtn";
import { UserX } from "lucide-react";

const Page = () => {
  const {
    followUser,
    loading,
    UnfollowUser,
    fetchFriendRequest,
    fetchFriendSuggestion,
    deleteUserFromRequest,
    fetchMutualFriends,
    friendRequest,
    friendSuggestion,
    mutualFriends,
  } = userFriendStore();

  useEffect(() => {
    (fetchFriendRequest(), fetchFriendSuggestion());
  }, []);

  const handleAction = async (action, userId) => {
    if (action === "confirm") {
      await followUser(userId);
      fetchFriendRequest();
      fetchFriendSuggestion();
    } else if (action === "delete") {
      await deleteUserFromRequest(userId);
      fetchFriendRequest();
      fetchFriendSuggestion();
    }
  };

  return (
    <>
      {/* --------------------------------Friend Requests----------------------------- */}
      <div className="mb-20">
        <h1 className="text-2xl font-semibold mb-6">
          {friendRequest.length > 0
            ? `You Received ${friendRequest.length} `
            : "No "}
          {friendRequest.length === 1 ? "Friend" : "Friends"}{" "}
          {friendRequest.length === 1 ? "Request" : "Requests"}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {loading ? (
            <FriendCardSkeleton />
          ) : friendRequest.length === 0 ? (
            <NoFriendsMessage
              text="No Friend Requests"
              description="Why not explore Nihongomax and connect with new people?"
            />
          ) : (
            friendRequest.map((friend) => (
              <FriendRequestCard
                key={friend._id}
                friend={friend}
                onAction={handleAction}
                deleteUserFromRequest={deleteUserFromRequest}
                fetchMutualFriends={fetchMutualFriends}
              />
            ))
          )}
        </div>
        {friendRequest.length > 5 && (
          <div className="mt-2 flex justify-center">
            <p
              className="cursor-pointer hover:bg-gray-100 rounded-md mt-10 py-1 px-50 border-white border-2 
              dark:border-gray-500 dark:hover:bg-blackdark:text-gray-300"
            >
              Show more...
            </p>
          </div>
        )}
        {friendRequest.length > 5 && (
          <div className="mt-2 flex justify-center">
            <p
              className="cursor-pointer hover:bg-gray-100 rounded-md mt-10
            py-1 px-50 border-white border-2 dark:border-gray-500 dark:hover:bg-black
            dark:text-gray-300"
            >
              Show more...
            </p>
          </div>
        )}
        {/* --------------------------------Friend Suggestions----------------------------- */}
        <h1 className="text-2xl font-semibold my-6">People you may know</h1>
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
                onAction={handleAction}
              />
            ))
          )}
        </div>
        {friendSuggestion.length > 5 && (
          <div className="mt-2 flex justify-center">
            <p
              className="cursor-pointer hover:bg-gray-100 rounded-md mt-10 py-1 px-50 border-white border-2
              dark:border-gray-500 dark:hover:bg-black dark:text-gray-300"
            >
              Show more...
            </p>
          </div>
        )}
      </div>
      <ScrollupBtn />
    </>
  );
};

export default Page;
