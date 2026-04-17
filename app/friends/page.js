"use client";
import React, { useEffect, useState } from "react";
import { FriendCardSkeleton, NoFriendsMessage } from "@/lib/Skeleten";
import FriendRequestCard from "./FriendRequestCard";
import FriendsSuggestion from "./FriendsSuggestion";
import { userFriendStore } from "@/store/userFriendsStore";
import ScrollupBtn from "../ScrollupBtn";
import userStore from "@/store/userStore";
import { useRouter } from "next/navigation";
import useT from "../hooks/useT";

const Page = () => {
  const [requestPage, setRequestPage] = useState(1);
  const [suggestionPage, setSuggestionPage] = useState(1);
  const t = useT();
  const { user } = userStore();
  const router = useRouter();
  const {
    followUser,
    loading,
    fetchFriendRequest,
    fetchFriendSuggestion,
    deleteUserFromRequest,
    fetchMutualFriends,
    friendRequest,
    friendSuggestion,
    requestHasMore,
    suggestionHasMore,
  } = userFriendStore();

  useEffect(() => {
    fetchFriendRequest(1);
    fetchFriendSuggestion(1);
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

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
            ? `${t("youRecvd")} ${friendRequest.length} `
            : t("no")}
          {friendRequest.length === 1 ? t("friend") : t("friends")}{" "}
          {friendRequest.length === 1 ? t("req") : t("reqs")}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {loading ? (
            <FriendCardSkeleton />
          ) : friendRequest.length === 0 ? (
            <NoFriendsMessage text={t("noFrndReq")} />
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
        {requestHasMore && (
          <div className="mt-2 flex justify-center">
            <p
              onClick={() => {
                const nextPage = requestPage + 1;
                setRequestPage(nextPage);
                fetchFriendRequest(nextPage);
              }}
              className="cursor-pointer hover:bg-gray-100 rounded-md mt-10 py-1 px-50 border-white border-2 dark:border-gray-500 dark:hover:bg-black
              dark:text-gray-300"
            >
              {t("showMore")}
            </p>
          </div>
        )}
        {/* --------------------------------Friend Suggestions----------------------------- */}
        <h1 className="text-2xl font-semibold my-6">{t("discover")}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {loading ? (
            <FriendCardSkeleton />
          ) : friendSuggestion.length === 0 ? (
            <NoFriendsMessage text={t("noFrndSug")} />
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
        {suggestionHasMore && (
          <div className="mt-2 flex justify-center">
            <p
              onClick={() => {
                const nextPage = suggestionPage + 1;
                setSuggestionPage(nextPage);
                fetchFriendSuggestion(nextPage);
              }}
              className="cursor-pointer hover:bg-gray-400 rounded-md mt-10 py-1 px-50 bg-white dark:hover:bg-black 
              dark:text-gray-300 font-[450]"
            >
              {t("showMore")}
            </p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2"></div>
      <ScrollupBtn />
    </>
  );
};

export default Page;
