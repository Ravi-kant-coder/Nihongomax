"use client";
import VideoUploadForm from "@/app/ducati127/VideoUploadForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllUsers } from "@/service/user.service";
import SearchUser from "./SearchUser";
import { Input } from "@/components/ui/input";

const Admin = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
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
    <>
      <div className="md:mt-20 mt-25">
        <VideoUploadForm />
      </div>
      {/* -----------------------------------User Purchase Data---------------------------------- */}
      <div className="md:mt-18 mt-25 mb-20">
        <h1 className="lg:text-4xl md:text-2xl text-xl font-semibold m-4">
          Search your friends @ Nihongomax
        </h1>
        <Input
          className="bg-white w-[70%] mx-auto dark:bg-gray-900"
          placeholder="Search Friends..."
        />
        <div className="inset-0 flex items-center w-full my-10 mx-auto">
          <span className="w-[40%] border-t border-muted-foreground"></span>
          <span className="uppercase text-gray-500 text-6xl mx-8">A</span>
          <span className="w-[40%] border-t border-muted-foreground"></span>
        </div>
        <div className="inset-0 flex items-center w-full my-10 mx-auto">
          <span className="w-[40%] border-t border-muted-foreground"></span>
          <span className="uppercase text-gray-500 text-6xl mx-8">B</span>
          <span className="w-[40%] border-t border-muted-foreground"></span>
        </div>
        <div className="grid lg:grid-cols-3 gap-4 ml-2">
          {userList.map((user, idx) => (
            <SearchUser
              idx={idx}
              user={user}
              key={user?._id}
              handleSearchUserClick={handleSearchUserClick}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Admin;
