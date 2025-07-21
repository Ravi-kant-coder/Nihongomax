"use client";
import React, { useEffect, useState } from "react";
import LeftSideBar from "@/app/LeftSideBar";
import { FriendCardSkeleton, NoFriendsMessage } from "@/lib/Skeleten";
import FriendRequestCard from "./FriendRequestCard";
import FriendsSuggestion from "./FriendsSuggestion";
import { userFriendStore } from "@/store/userFriendsStore";
import userStore from "@/store/userStore";
import ScrollupBtn from "../ScrollupBtn";
import { useRouter } from "next/navigation";

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

  const router = useRouter();
  const { user } = userStore();

  const handleDpClick = () => {
    router.push(`/user-profile/${friendSuggestion?._id}`);
  };

  useEffect(() => {
    fetchFriendRequest(), fetchFriendSuggestion();
  }, []);

  const handleAction = async (action, userId) => {
    if (action === "confirm") {
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
                  handleFriendClick={handleDpClick}
                  key={friend._id}
                  friend={friend}
                  loading={loading}
                  onAction={handleAction}
                  deleteUserFromRequest={deleteUserFromRequest}
                  fetchMutualFriends={fetchMutualFriends}
                />
              ))
            )}
          </div>

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
                  handleFriendClick={handleDpClick}
                  onAction={handleAction}
                />
              ))
            )}
          </div>
        </main>
      </div>
      <ScrollupBtn />
    </div>
  );
};

export default Page;
