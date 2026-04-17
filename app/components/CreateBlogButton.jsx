"use client";
import { useRouter } from "next/navigation";
import userStore from "@/store/userStore";

export default function CreateBlogButton() {
  const router = useRouter();
  const { user } = userStore();

  const isAdmin = user?._id && user._id === process.env.NEXT_PUBLIC_ADMIN_ID;

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
