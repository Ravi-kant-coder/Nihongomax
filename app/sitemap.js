import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export default async function sitemap() {
  await connectDB();

  const blogs = await Blog.find().lean();

  return blogs.map((blog) => ({
    url: `http://localhost:3000/information/${blog.slug}`,
    lastModified: blog.updatedAt,
  }));
}
