import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, UserX } from "lucide-react";
// import { userFriendStore } from "@/stores/userFriendsStore";
// import toast from "react-hot-toast";
const mutualFriends = [
  {
    _id: 1,
    mediaURL: "/Horizontal1.jpg",
    mediaType: "image",
    user: {
      username: "Sangeeta Verma",
    },
  },
  {
    _id: 2,
    mediaURL: "/Girl.jpg",
    mediaType: "image",
    user: {
      username: "Ruby Bhatia",
    },
  },
  {
    _id: 3,
    mediaURL: "Horizontal2.jpg",
    mediaType: "image",
    user: {
      username: "Pramod Solanki",
    },
  },
  {
    _id: 4,
    mediaURL:
      "https://images.pexels.com/photos/29940495/pexels-photo-29940495/free-photo-of-elegant-fashion-editorial-portrait-in-london-studio.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    mediaType: "image",
    user: {
      username: "Mansi Yadav",
    },
  },
  {
    _id: 5,
    mediaURL:
      "https://images.pexels.com/photos/30375728/pexels-photo-30375728/free-photo-of-elegant-black-and-white-wedding-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    mediaType: "image",
    user: {
      username: "Anchal Gupta",
    },
  },
  {
    _id: 6,
    mediaURL:
      "https://images.pexels.com/photos/31890680/pexels-photo-31890680/free-photo-of-woman-in-white-dress-surrounded-by-monstera-leaves.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    mediaType: "image",
    user: {
      username: "Bhavna Sharma",
    },
  },
  {
    _id: 7,
    mediaURL:
      "https://images.pexels.com/photos/31649556/pexels-photo-31649556/free-photo-of-elegant-model-in-fashionable-black-attire.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    mediaType: "image",
    user: {
      username: "Meenakshi Malhotra",
    },
  },
  {
    _id: 8,
    mediaURL:
      "https://images.pexels.com/photos/31649556/pexels-photo-31649556/free-photo-of-elegant-model-in-fashionable-black-attire.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    mediaType: "image",
    user: {
      username: "Priya Wadhwa",
    },
  },
  {
    _id: 9,
    mediaURL:
      "https://images.pexels.com/photos/2218786/pexels-photo-2218786.jpeg?auto=compress&cs=tinysrgb&w=600",
    mediaType: "image",
    user: {
      username: "Krishna Gupta",
    },
  },
];
const MutualFriends = ({ id, isOwner }) => {
  const { fetchMutualFriends, mutualFriends, UnfollowUser } = userFriendStore();
  useEffect(() => {
    if (id) {
      fetchMutualFriends(id);
    }
  }, [id, fetchMutualFriends]);

  const handleUnfollow = async (userId) => {
    await UnfollowUser(userId);
    toast.success("Unfollowed successfully");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4"
    >
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-300">
            Mutual Friends
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mutualFriends?.map((friend) => (
              <div
                key={friend?._id}
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-start justify-between"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    {friend?.profilePicture ? (
                      <AvatarImage
                        src={friend?.profilePicture}
                        alt={friend?.username}
                      />
                    ) : (
                      <AvatarFallback className="dark:bg-gray-400">
                        {/* {userPlaceholder} */}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="font-semibold dark:text-gray-100">
                      {friend?.username}
                    </p>
                    <p className="text-sm text-gray-400">
                      {/* {friend?.followerCount} folllowers */}100
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4 text-gray-300" />
                    </Button>
                  </DropdownMenuTrigger>
                  {isOwner && (
                    <DropdownMenuContent
                      align="end"
                      onClick={async () => {
                        await handleUnfollow(friend?._id);
                        await fetchMutualFriends(id);
                      }}
                    >
                      <DropdownMenuItem>
                        <UserX className="h-4 w-4 mr-2" /> Unfollow
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  )}
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MutualFriends;
