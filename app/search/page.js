"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useTransition, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAllUsers } from "@/service/user.service";
import userStore from "@/store/userStore";
import Spinner from "../Spinner";
import { Input } from "@/components/ui/input";
import LeftSideBar from "../LeftSideBar";

const Search = () => {
  const pathname = usePathname();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const result = await getAllUsers(); //from axios services
        setUserList(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  //Routing to searched user profile page
  const handleSearchUserClick = async (userId) => {
    try {
      router.push(`/user-profile/${userId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:mt-18 mt-25 mb-20">
      <div className="p-2 w-1/5 overflow-y-auto scroll-smooth overscroll-contain">
        <LeftSideBar />
      </div>
      <div className="md:ml-80">
        <h1 className="text-4xl font-semibold m-4">
          Search Your Friends @ Nihongomax
        </h1>
        {userList
          .map((user) => (
            <div
              className="flex items-center space-x-8 p-2 hover:bg-gray-200
                              dark:hover:bg-gray-700 rounded-md cursor-pointer"
              key={user?._id}
              onClick={() => handleSearchUserClick(user?._id)}
            >
              <Avatar className="cursor-pointer h-10 w-10 mr-3 hover:ring-2 ring-gray-500">
                <AvatarImage
                  src={user?.profilePicture}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gray-400 dark:bg-black capitalize">
                  {user?.username.split(" ")[0][0]}
                </AvatarFallback>
              </Avatar>
              {user.username} -{user.followerCount} Friends
            </div>
          ))
          .sort()}
        {isPending && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-white/30
              dark:bg-black/60 backdrop-blur-xs z-[9999]"
          >
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
