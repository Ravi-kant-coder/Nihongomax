"use server";

import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function createBlog(data) {
  await connectDB();

  await Blog.create({
    ...data,
  });

  return { success: true };
}
