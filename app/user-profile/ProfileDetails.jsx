import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Cake,
  GraduationCap,
  Heart,
  Home,
  Mail,
  MapPin,
  Phone,
  Rss,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MutualFriends from "./profileContent/MutualFriends";
import EditBio from "./profileContent/EditBio";
import { usePostStore } from "@/store/usePostStore";
import { formatDateInDDMMYYY } from "@/lib/utils";
import { FriendCardSkeleton, NoFriendsMessage } from "@/lib/Skeleten";
import { PicsSkeleton } from "@/lib/PicsSkeleten";
import WallCard from "../WallCard";
import { motion } from "framer-motion";

const ProfileDetails = ({
  activeTab,
  id,
  profileData,
  isOwner,
  fetchProfile,
  user,
}) => {
  const [isEditBioModel, setIsEditBioModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [likePosts, setLikePosts] = useState(new Set());
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    userPosts,
    fetchUserPost,
    handleLikePost,
    handleCommentPost,
    handleSharePost,
  } = usePostStore();

  useEffect(() => {
    if (id) {
      fetchUserPost(id);
    }
  }, [id, fetchUserPost]);

  useEffect(() => {
    const saveLikes = localStorage.getItem("likePosts");
    if (saveLikes) {
      setLikePosts(new Set(JSON.parse(saveLikes)));
    }
  }, []);

  const handleLike = async (postId) => {
    const updatedLikePost = new Set(likePosts);
    if (updatedLikePost.has(postId)) {
      updatedLikePost.delete(postId);
    } else {
      updatedLikePost.add(postId);
    }
    setLikePosts(updatedLikePost);
    localStorage.setItem(
      "likePosts",
      JSON.stringify(Array.from(updatedLikePost))
    );

    try {
      await handleLikePost(postId);
      await fetchUserPost();
    } catch (error) {
      console.error(error);
    }
  };

  const tabContent = {
    posts: (
      <div className="flex flex-col lg:flex-row gap-6 ">
        <div className="w-full md:w-[30%] space-x-0 space-y-6 mb-4">
          <Card>
            <CardContent
              className="p-6 shadow-gray-400 rounded-md dark:text-gray-300 
            shadow-lg dark:shadow-black"
            >
              <h2 className="text-xl font-semibold mb-4 dark:text-gray-300">
                {isOwner ? "Your" : `${profileData?.username.split(" ")[0]}'s`}{" "}
                Introduction
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {profileData?.bio?.bioText}
              </p>
              <div className="space-y-2 mb-4 dark:text-gray-300">
                <div className="flex items-center">
                  <Home className="w-5 h-5 mr-2 shrink-0" />
                  <span> {profileData?.bio?.liveIn}</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 shrink-0" />
                  <span>{profileData?.bio?.relationship}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 shrink-0" />
                  <span>{profileData?.bio?.hometown}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 shrink-0" />
                  <span> {profileData?.bio?.workplace}</span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 shrink-0" />
                  <span> {profileData?.bio?.education}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 shrink-0" />
                  <span>{profileData?.bio?.phone}</span>
                </div>
              </div>
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-[30%] border-t border-muted-foreground"></span>
                  <div className="w-[40%]"> </div>
                  <span className="w-[30%] border-t border-muted-foreground"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className=" px-2 text-muted-foreground">
                    personal info
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 shrink-0" />
                <span>{profileData?.email}</span>
              </div>
              <div className="flex items-center">
                <Cake className="w-5 h-5 mr-2 shrink-0" />
                <span>
                  Birthday: {formatDateInDDMMYYY(profileData?.dateOfBirth)}
                </span>
              </div>
              <div className="flex items-center mb-4 dark:text-gray-300">
                <Rss className="w-5 h-5 mr-2 shrink-0" />
                <span>
                  Followed by {profileData?.followerCount}{" "}
                  {profileData?.followerCount === 1 ? "person" : "people"}
                </span>
              </div>
              {isOwner && (
                <Button
                  className="w-full cursor-pointer dark:bg-black dark:text-white
                  dark:hover:text-white hover:dark:bg-gray-800"
                  onClick={() => setIsEditBioModel(true)}
                >
                  Edit/Add
                </Button>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent
              className="p-6 shadow-gray-400 rounded-md dark:text-gray-300 
            shadow-lg dark:shadow-black"
            >
              <h2 className="text-xl font-semibold mb-4 dark:text-gray-300">
                Photos by{" "}
                {isOwner ? "you" : profileData?.username.split(" ")[0]}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {userPosts?.filter(
                  (post) => post?.mediaType === "image" && post?.mediaUrl
                ).length === 0 ? (
                  <PicsSkeleton text="No Photos" />
                ) : (
                  userPosts
                    ?.filter(
                      (post) => post?.mediaType === "image" && post?.mediaUrl
                    )
                    .map((post) => (
                      <img
                        key={post?._id}
                        src={post?.mediaUrl}
                        alt="photos"
                        className="w-[200px] h-[150px] object-cover rounded"
                      />
                    ))
                )}
              </div>
            </CardContent>
          </Card>
          <MutualFriends id={id} isOwner={isOwner} profileData={profileData} />
          {isOwner && (
            <button
              className="w-full border border-red-800 text-red-700 h-10 text-lg rounded-lg
            cursor-pointer hover:bg-red-300 group flex items-center justify-center
            bg-red-200 dark:bg-zinc-900 dark:border-red-400 dark:text-red-400
            hover:dark:text-red-500 hover:dark:border-red-500"
              onClick={() => {
                setShowDeleteModal(true);
              }}
            >
              <Trash2
                className="h-5 w-6 mr-2 text-red-600 
                 dark:text-red-400 group-hover:dark:text-red-500"
              />{" "}
              Delete Account
            </button>
          )}
        </div>
        <div className="w-full md:w-[70%]">
          {loading ? (
            <FriendCardSkeleton />
          ) : userPosts.length === 0 ? (
            <NoFriendsMessage
              text="No Questions or Pics"
              description="Why not put questions on wall?"
            />
          ) : (
            userPosts?.map((post) => (
              <WallCard
                key={post._id}
                post={post}
                onLike={() => handleLike(post?._id)}
                onComment={async (comment) => {
                  await handleCommentPost(post?._id, comment?.text);
                  await fetchUserPost(id);
                }}
                onShare={async () => {
                  await handleSharePost(post?._id);
                  await fetchUserPost(id);
                }}
              />
            ))
          )}
        </div>
        {/* --------------------Delete Confirmation Modal------------------- */}
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
          >
            <div className="bg-white dark:bg-[rgb(50,50,50)] p-6 rounded-2xl shadow-2xl w-80">
              <h2 className="text-center text-red-600 dark:text-white font-semibold text-xl">
                Delete Account permanently {user?.username.split(" ")[0]}?
              </h2>
              <p className="text-sm dark:text-gray-300 text-center my-2">
                Account will never be recovered.
              </p>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-300 cursor-pointer 
                    dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-sm"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600
              cursor-pointer text-white text-sm"
                  onClick={() => {
                    setShowDeleteModal(false);
                    // handleAccountDelete();
                  }}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    ),
  };
  return (
    <div>
      {tabContent[activeTab] || null}
      <EditBio
        isOpen={isEditBioModel}
        onClose={() => setIsEditBioModel(false)}
        fetchProfile={fetchProfile}
        initialData={profileData?.bio}
        id={id}
      ></EditBio>
    </div>
  );
};

export default ProfileDetails;
