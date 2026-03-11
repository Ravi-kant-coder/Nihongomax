"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateBlogButton() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`,
          { withCredentials: true },
        );

        if (res.data?.data?.userId === process.env.NEXT_PUBLIC_ADMIN_ID) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.log("not Admin");
      }
    }

    checkUser();
  }, []);

  if (!isAdmin) return null;

  return (
    <button
      onClick={() => router.push("/kanri/createBlog")}
      className="px-5 py-2 rounded bg-gray-600 text-white hover:bg-gray-700 dark:bg-gray-400 cursor-pointer"
    >
      Create Blog
    </button>
  );
}
