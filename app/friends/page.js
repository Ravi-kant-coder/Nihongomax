"use client";
import React, { useEffect, useState } from "react";
import LeftSideBar from "@/app/LeftSideBar";
import { FriendCardSkeleton, NoFriendsMessage } from "@/lib/Skeleten";
import FriendRequest from "./FriendRequestCard";
import FriendsSuggestion from "./FriendsSuggestion";
import FriendRequestCard from "./FriendRequestCard";
// import { userFriendStore } from "@/store/userFriendsStore";
// import toast from "react-hot-toast";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const friendRequests = [
    { _id: 1, profilePicture: "/Girl.jpg", username: "Gayatri Singhania" },
    {
      _id: 2,
      profilePicture: "/Horizontal1.jpg",
      username: "Shola aur Shabnam",
    },
    {
      _id: 3,
      profilePicture: "/Horizontal2.pg",
      username: "Madhurima",
    },
  ];
  const friendSuggestion = [
    {
      _id: 1,
      profilePicture: "/Girl.jg",
      username: "Golu chander",
    },
    {
      _id: 2,
      profilePicture: "/Horizontal1.jpg",
      username: "Gayatri Singhania",
    },
    {
      _id: 3,
      profilePicture: "/Horizontal2.jpg",
      username: "Singhania",
    },
  ];
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
    <div className="md:mt-20 mt-25 mb-20">
      <div className="md:mt-15 p-2 w-1/5 overflow-y-auto scroll-smooth overscroll-contain">
        <LeftSideBar />
      </div>
      <div className="">
        <main className="lg:p-6 p-2 lg:rounded-lg lg:ml-70 mx-4 lg:mx-0 mb-20">
          <h1 className="text-2xl font-bold mb-6">
            {friendRequests.length > 0 ? "You Received " : "No "}Friends
            Requests
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
    </div>
  );
};

export default Page;
