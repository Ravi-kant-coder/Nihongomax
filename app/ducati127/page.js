"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllUsers } from "@/service/user.service";
import UsersList from "./UsersList";
import { Input } from "@/components/ui/input";

const Admin = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const result = await getAllUsers();
        setUserList(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSearchUserClick = async (userId) => {
    try {
      router.push(`/user-profile/${userId}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* -----------------------------------User Purchase Data---------------------------------- */}
      <Input
        className="bg-white w-[50%] mx-auto dark:bg-gray-900"
        placeholder="Search User..."
      />
      <div className="flex flex-col items-center mt-5">
        {userList.map((user, idx) => (
          <UsersList
            idx={idx}
            user={user}
            key={user?._id}
            handleSearchUserClick={handleSearchUserClick}
            className="w-full"
            // status={user?.status}
            status={"purchased"}
          />
        ))}
      </div>
    </>
  );
};

export default Admin;
