import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Link from "next/link";

export const metadata = {
  title: "All Japanese Learning Blogs | NihongoMax",
  description:
    "Explore Japanese grammar, JLPT preparation, kanji, and learning guides.",
};
export const revalidate = 60;

export default async function InformationPage() {
  await connectDB();

  const blogs = await Blog.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold">All Information</h1>

      {blogs.map((blog) => (
        <div key={blog._id} className="border-b pb-6">
          <h2 className="text-2xl font-semibold">
            <Link
              href={`/information/${blog.slug}`}
              className="hover:underline"
            >
              {blog.title}
            </Link>
          </h2>

          <p className="text-gray-600 mt-2">{blog.metaDescription}</p>
        </div>
      ))}
    </div>
  );
}
