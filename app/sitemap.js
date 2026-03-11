import { getBlogs } from "@/lib/blog";

export default async function sitemap() {
  const blogs = await getBlogs();

  const blogUrls = blogs.map((blog) => ({
    url: `https://nihongomax.com/information/${blog.slug}`,
    lastModified: blog.updatedAt,
  }));

  return [
    {
      url: "https://nihongomax.com",
      lastModified: new Date(),
    },
    {
      url: "https://nihongomax.com/information",
      lastModified: new Date(),
    },
    ...blogUrls,
  ];
}
