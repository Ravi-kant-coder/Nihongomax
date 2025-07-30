import React from "react";
import { Lock, LockOpen } from "lucide-react";
import { useState } from "react";

const UsersData = ({ user }) => {
  const [isPaid, setIsPaid] = useState(false);

  return (
    <tr>
      <td className="border dark:border-white border-black p-1">{user?._id}</td>
      <td className="border dark:border-white border-black p-1">
        <h1>{user?.username}</h1>
      </td>
      <td className="border dark:border-white border-black p-1">
        {user?.updatedAt}, {user?.__v}
      </td>
      <td className="border dark:border-white border-black p-1">
        {user?.createdAt}
      </td>
      <td className="border dark:border-white border-black p-1">04-Jun-2025</td>
      <td className="border dark:border-white border-black p-1">03-Sep-2025</td>
      <td className="border dark:border-white border-black p-1">
        {isPaid ? (
          <LockOpen color="#006c0f" strokeWidth={2.25} className="ml-2" />
        ) : (
          <Lock color="#ff0000" strokeWidth={2.25} className="ml-2" />
        )}
      </td>
    </tr>
  );
};

export default UsersData;
