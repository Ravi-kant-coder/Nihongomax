"use client";
import React, { useEffect, useState } from "react";
import LeftSideBar from "@/app/LeftSideBar";
import { FriendCardSkeleton, NoFriendsMessage } from "@/lib/Skeleten";
import FriendRequestCard from "./FriendRequestCard";
import FriendsSuggestion from "./FriendsSuggestion";
import { userFriendStore } from "@/store/userFriendsStore";

import toast from "react-hot-toast";

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
    fetchFriendRequest(), fetchFriendSuggestion();
  }, []);

  const handleAction = async (action, userId) => {
    if (action === "confirm") {
      toast.success("friend added successfully");
      await followUser(userId);
      fetchFriendRequest();
      fetchFriendSuggestion();
    } else if (action === "delete") {
      await UnfollowUser(userId);
      fetchFriendRequest();
      fetchFriendSuggestion();
    }
  };

  return (
    <div className="md:mt-20 mt-25 mb-20">
      <div className="p-2 w-1/5 overflow-y-auto scroll-smooth overscroll-contain">
        <LeftSideBar />
      </div>
      <div className="">
        <main className="md:ml-80 mx-4 mb-20">
          <h1 className="text-2xl font-bold mb-6">
            {friendRequest.length > 0
              ? `You Received ${friendRequest.length} `
              : "No "}
            Friend Requests
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
                  loading={loading}
                  onAction={handleAction}
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
                  onAction={handleAction}
                />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
