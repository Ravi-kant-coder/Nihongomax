import React, { useState, useEffect, useTransition } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { UserX } from "lucide-react";
import { userFriendStore } from "@/store/userFriendsStore";
import { useRouter } from "next/navigation";
import Spinner from "@/app/Spinner";
import { NoFriendsMessage } from "@/lib/Skeleten";
import { PicsSkeleton } from "@/lib/PicsSkeleten";

const MutualFriends = ({ id, isOwner, profileData }) => {
  const { fetchMutualFriends, mutualFriends, UnfriendUser } = userFriendStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

  const handlefriendClick = (id) => {
    startTransition(() => {
      if (id) {
        router.push(`/user-profile/${id}`);
      }
    });
  };

  useEffect(() => {
    if (id) {
      fetchMutualFriends(id);
    }
  }, [id, fetchMutualFriends]);

  const handleUnfriend = async (userId) => {
    await UnfriendUser(userId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Card>
        <CardContent
          className="p-4 shadow-gray-400 rounded-md dark:text-gray-300 shadow-lg
          dark:shadow-black"
        >
          <h2 className="text-xl font-semibold  dark:text-gray-300 capitalize">
            {isOwner ? "Your" : `${profileData?.username?.split(" ")[0]}'s`}{" "}
            Friends
          </h2>
          <p className="text-gray-700 text-sm flex dark:text-gray-500">
            {mutualFriends.length}{" "}
            {mutualFriends.length === 1 ? "friend" : "friends"}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {mutualFriends.length === 0 ? (
              <PicsSkeleton text="No Friends" />
            ) : (
              [...new Map(mutualFriends.map((f) => [f._id, f])).values()].map(
                (friend) => (
                  <div
                    key={friend?._id}
                    onClick={() => handlefriendClick(friend?._id)}
                    className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 
                    rounded-lg relative group"
                  >
                    <div className="flex flex-col justify-center items-center mt-8">
                      <Avatar className="w-35 h-35 rounded">
                        <AvatarImage
                          src={friend?.profilePicture}
                          className="object-cover"
                        />
                        <AvatarFallback className="w-35 h-35 rounded text-4xl dark:text-black">
                          {friend?.username?.split(" ")[0][0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p
                          className="font-[450] text-sm dark:text-gray-100 truncate w-30
                         capitalize"
                        >
                          {friend?.username}
                        </p>
                        <p className="text-sm text-gray-500">
                          {friend?.followerCount} followers
                        </p>
                      </div>
                    </div>
                    {isOwner && (
                      <div
                        className="absolute bg-white rounded p-1 opacity-0 top-0 right-0
                    group-hover:opacity-100 transition group-hover:text-black"
                        onClick={async (e) => {
                          e.stopPropagation();
                          await handleUnfriend(friend?._id);
                          await fetchMutualFriends(id);
                        }}
                      >
                        <div className="flex text-xs items-center">
                          <UserX className="mr-2 w-4 h-4" /> Unfriend
                        </div>
                      </div>
                    )}
                  </div>
                )
              )
            )}
          </div>
        </CardContent>
      </Card>
      {/* ------------------------Spinner-------------------------- */}
      {isPending && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-white/60
                       dark:bg-black/60 backdrop-blur-sm z-[9999] transition-opacity
                        duration-300 opacity-100"
        >
          <Spinner />
        </div>
      )}
    </motion.div>
  );
};

export default MutualFriends;
