"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getAdminUsers,
  verifySpecialPagePassword,
} from "@/service/user.service";
import UsersList from "./UsersList";
import { Input } from "@/components/ui/input";

const Admin = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [password, setPassword] = useState("");
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      setPasswordError("");
      setLoading(true);

      await verifySpecialPagePassword(password);

      setPasswordVerified(true);
    } catch (error) {
      console.log(error);
      setPasswordError(error.response?.data?.message || "Incorrect password");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!passwordVerified) return;

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
  }, [passwordVerified]);

  const handleSearchUserClick = async (userId) => {
    try {
      router.push(`/user-profile/${userId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccessChanged = (userId, subscription) => {
    setUserList((currentUsers) =>
      currentUsers.map((user) =>
        user._id === userId ? { ...user, subscription } : user,
      ),
    );
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

  if (!passwordVerified) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <form
          onSubmit={handlePasswordSubmit}
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md w-[320px]"
        >
          <h2 className="text-xl font-semibold text-center mb-5">
            Enter Password
          </h2>

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white dark:bg-gray-900"
          />

          {passwordError && (
            <p className="text-red-600 text-sm mt-2">{passwordError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-md disabled:opacity-50"
          >
            {loading ? "Checking..." : "Enter"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      <div className="w-[80%] mx-auto mb-6 flex justify-center gap-4">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-md px-6 py-3 text-center">
          <div className="text-2xl font-semibold">{totalUsers}</div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/30 rounded-md px-6 py-3 text-center">
          <div className="text-2xl font-semibold text-green-600">
            {purchasedUsers}
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/30 rounded-md px-6 py-3 text-center">
          <div className="text-2xl font-semibold text-red-600">
            {notPurchasedUsers}
          </div>
        </div>
      </div>

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
            onAccessChanged={handleAccessChanged}
            className="w-full"
            status={user?.subscription ? "purchased" : "not-purchased"}
          />
        ))}
      </div>
    </>
  );
};

export default Admin;
