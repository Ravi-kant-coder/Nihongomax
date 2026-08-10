"use client";
import { useRouter } from "next/navigation";
import userStore from "@/store/userStore";

export default function EditBlogButton({ blogId }) {
  const router = useRouter();
  const { user } = userStore();
  // const [deleting, setDeleting] = useState(false);

  const isAdmin = user?._id && user._id === process.env.NEXT_PUBLIC_ADMIN_ID;

  if (!isAdmin) return null;

  // const handleDelete = async () => {
  //   const confirmDelete = confirm("Delete this blog?");
  //   if (!confirmDelete) return;
  //   try {
  //     setDeleting(true);
  //     await axios.delete(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/admin/${blogId}`,
  //       { withCredentials: true },
  //     );
  //     router.push("/blogs");
  //     router.refresh();
  //   } catch (error) {
  //     alert("Failed to delete blog");
  //   } finally {
  //     setDeleting(false);
  //   }
  // };

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
