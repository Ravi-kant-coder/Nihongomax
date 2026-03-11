"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminBlogButtons({ blogId }) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

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
        console.log("not admin");
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, []);

  if (loading || !isAdmin) return null;

  // Not deleting Image from cloudinary
  const handleDelete = async () => {
    const confirmDelete = confirm("Delete this blog?");
    if (!confirmDelete) return;

    try {
      setDeleting(true);

      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/admin/${blogId}`,
        { withCredentials: true },
      );

      router.push("/information");
      router.refresh();
    } catch (error) {
      alert("Failed to delete blog");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex gap-4 mt-10">
      <button
        onClick={() => router.push(`/kanri/blogEdit/${blogId}`)}
        className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-black cursor-pointer"
      >
        Edit Blog
      </button>

      {/* <button
        onClick={handleDelete}
        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
      >
        Delete Blog
      </button> */}
    </div>
  );
}
