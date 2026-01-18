import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpenCheck,
  Briefcase,
  GraduationCap,
  HomeIcon,
  Languages,
  Mail,
  MapPin,
  Phone,
  Plane,
  Rss,
  BookHeart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MutualFriends from "./profileContent/MutualFriends";
import EditBio from "./profileContent/EditBio";
import { usePostStore } from "@/store/usePostStore";
import { FriendCardSkeleton, NoFriendsMessage } from "@/lib/Skeleten";
import { PicsSkeleton } from "@/lib/PicsSkeleten";
import WallCard from "../WallCard";
import { notFound } from "next/navigation";

const ProfileDetails = ({ id, profileData, isOwner, fetchProfile }) => {
  const [isEditBioModel, setIsEditBioModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [likePosts, setLikePosts] = useState(new Set());
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
      JSON.stringify(Array.from(updatedLikePost)),
    );
    try {
      await handleLikePost(postId);
      await fetchUserPost(id);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto px-4 md:px-0 mt-8 justify-center">
      <div className="w-full md:w-[60%] space-x-0 space-y-6 mb-4">
        {/*------------------------------Details About You-----------------------------*/}
        <Card>
          <CardContent
            className="p-6 shadow-gray-400 rounded-md dark:text-gray-300 
            shadow-lg dark:shadow-black"
          >
            <h2 className="text-xl font-semibold dark:text-gray-300 capitalize">
              {isOwner ? "Your" : `${profileData?.username?.split(" ")[0]}'s`}{" "}
              Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {profileData?.bio?.bioText}
            </p>
            <div className="space-y-2 mb-4 dark:text-gray-300">
              <div className="flex flex-col">
                <div className="flex items-center font-semibold">
                  <GraduationCap className="w-5 h-5 mr-1 shrink-0" />
                  Education:
                </div>
                <span className="ml-2">
                  {profileData?.bio?.liveIn || (
                    <p className="text-gray-500">Not mentioned</p>
                  )}
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center font-semibold">
                  <Languages className="w-5 h-5 mr-1 shrink-0" />
                  JLPT/NAT cleared:
                </div>
                <span className="ml-2">
                  {profileData?.bio?.relationship || (
                    <p className="text-gray-500">Not mentioned</p>
                  )}
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center font-semibold">
                  <MapPin className="w-5 h-5 mr-1 shrink-0" />
                  Work Place:
                </div>
                <span className="ml-2">
                  {profileData?.bio?.workplace || (
                    <p className="text-gray-500">Not mentioned</p>
                  )}
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center font-semibold">
                  <Briefcase className="w-5 h-5 mr-1 shrink-0" />
                  Work Experience:
                </div>
                <span className="ml-2">
                  {profileData?.bio?.education || (
                    <p className="text-gray-500">Not mentioned</p>
                  )}
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center font-semibold">
                  <BookOpenCheck className="w-5 h-5 mr-1 shrink-0" />
                  Certifications:
                </div>
                <span className="ml-2">
                  {profileData?.bio?.hometown || (
                    <p className="text-gray-500">Not mentioned</p>
                  )}
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center font-semibold">
                  <Plane className="w-5 h-5 mr-1 shrink-0" />
                  Japan Experience:
                </div>
                <span className="ml-2">
                  {profileData?.bio?.birthday || (
                    <p className="text-gray-500">Not mentioned</p>
                  )}
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center font-semibold">
                  <BookHeart className="w-5 h-5 mr-1 shrink-0" />
                  About Me:
                </div>
                <span className="ml-2">
                  {profileData?.bio?.address || (
                    <p className="text-gray-500">Not mentioned</p>
                  )}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center my-4">
              <span className="w-[30%] border-t border-muted-foreground"></span>
              <span className="uppercase w-[40%] text-center text-sm text-gray-500 mx-auto">
                personal information
              </span>
              <span className="w-[30%] border-t border-muted-foreground"></span>
            </div>
            <div className="flex items-center mt-2">
              <Mail className="w-5 h-5 mr-2 shrink-0" />
              Email:
              <span className="ml-2">
                {profileData?.email || (
                  <p className="text-gray-500">Undisclosed</p>
                )}
              </span>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2 shrink-0" />
              Phone:
              <span className="ml-2">
                {" "}
                {profileData?.bio?.phone || (
                  <p className="text-gray-500">Undisclosed</p>
                )}
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
        {/*------------------------------Photos by You-----------------------------*/}
        <Card>
          <CardContent
            className="p-6 shadow-gray-400 rounded-md dark:text-gray-300 
            shadow-lg dark:shadow-black"
          >
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-300">
              Photos by{" "}
              {isOwner ? (
                "you"
              ) : (
                <span className="capitalize">
                  {profileData?.username?.split(" ")[0]}
                </span>
              )}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {userPosts?.filter(
                (post) => post?.mediaType === "image" && post?.mediaUrl,
              ).length === 0 ? (
                <PicsSkeleton text="No Photos" />
              ) : (
                userPosts
                  ?.filter(
                    (post) => post?.mediaType === "image" && post?.mediaUrl,
                  )
                  .map((post) => (
                    <img
                      key={post?._id}
                      src={post?.mediaUrl}
                      alt="photos"
                      className="w-[200px] h-[150px] object-cover rounded-lg"
                    />
                  ))
              )}
            </div>
          </CardContent>
        </Card>
        <MutualFriends id={id} isOwner={isOwner} profileData={profileData} />
      </div>
      {/*------------------------------Posts by You-----------------------------*/}
      <div className="w-full">
        {userPosts.length > 0 && (
          <div
            className="bg-white dark:bg-[rgb(55,55,55)] rounded-t-lg 
          mb-2 p-2 font-[450] text-center text-lg capitalize"
          >
            Posts by {isOwner ? "You" : `${profileData?.username}`}
          </div>
        )}
        {loading ? (
          <FriendCardSkeleton />
        ) : userPosts.length === 0 ? (
          <NoFriendsMessage
            text="No Questions or Pics"
            description={
              <>
                Why not put questions on{" "}
                <HomeIcon className="inline-block w-5 h-5 align-text-top" />{" "}
                wall?
              </>
            }
          />
        ) : (
          userPosts?.map((post) => (
            <WallCard
              namaye={isOwner}
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
