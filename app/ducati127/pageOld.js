"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminUsers } from "@/service/user.service";
import UsersList from "./UsersList";
import { Input } from "@/components/ui/input";

const Admin = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const result = await getAdminUsers();
        setUserList(result.data);
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

  const totalUsers = userList.length;

  const purchasedUsers = userList.filter((user) => {
    const subscription = user?.subscription;
    return (
      subscription?.status === "active" &&
      subscription?.expiryDate &&
      new Date(subscription.expiryDate) > new Date()
    );
  }).length;

  const notPurchasedUsers = totalUsers - purchasedUsers;

  const filteredUsers = userList.filter((user) => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return true;

    return (
      user?.username?.toLowerCase().includes(query) ||
      user?.email?.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <div className="w-[80%] mx-auto mb-6 flex justify-center gap-4">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-md px-6 py-3 text-center">
          <div className="text-xs text-gray-500">Total Customers</div>
          <div className="text-2xl font-semibold">{totalUsers}</div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/30 rounded-md px-6 py-3 text-center">
          <div className="text-xs text-gray-500">Purchased</div>
          <div className="text-2xl font-semibold text-green-600">
            {purchasedUsers}
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/30 rounded-md px-6 py-3 text-center">
          <div className="text-xs text-gray-500">Not Purchased</div>
          <div className="text-2xl font-semibold text-red-600">
            {notPurchasedUsers}
          </div>
        </div>
      </div>
      {/* -----------------------------------User Purchase Data---------------------------------- */}
      <Input
        className="bg-white w-[50%] mx-auto dark:bg-gray-900"
        placeholder="Search User..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="flex flex-col items-center mt-5">
        {filteredUsers.map((user, idx) => (
          <UsersList
            idx={idx}
            user={user}
            key={user?._id}
            handleSearchUserClick={handleSearchUserClick}
            className="w-full"
            status={user?.subscription ? "purchased" : "not-purchased"}
          />
        ))}
      </div>
    </>
  );
};

export default Admin;
