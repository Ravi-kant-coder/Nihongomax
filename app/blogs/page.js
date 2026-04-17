import Link from "next/link";
import Image from "next/image";
import CreateBlogButton from "../components/CreateBlogButton";
import { getBlogs } from "@/lib/blog";

export const metadata = {
  title: "All Japanese Learning Blogs | NihongoMax",
  description:
    "Explore Japanese grammar, JLPT preparation, kanji, and structured learning guides.",
};

export const revalidate = 60;

export default async function InformationPage() {
  const blogs = await getBlogs();

  const optimizeImage = (url, width = 500) => {
    if (!url || typeof url !== "string") return "";

    const uploadIndex = url.indexOf("upload/");
    if (uploadIndex === -1) return url;

    return (
      url.slice(0, uploadIndex + 7) +
      `q_auto,f_auto,w_${width}/` +
      url.slice(uploadIndex + 7)
    );
  };

  return (
    <>
      <div className="mx-10">
        <h1 className="text-3xl font-bold mb-10 text-center sr-only">
          Get the latest Japanese learning blogs, Japanese grammar guides, JLPT
          tips, and kanji insights to boost your language skills.
        </h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {blogs.map((blog) => {
            const imageUrl = blog?.featuredImage?.url
              ? optimizeImage(blog.featuredImage?.url, 500)
              : "/fujisan.png";
            return (
              <Link
                key={blog?._id}
                href={`/blogs/${blog?.slug}`}
                className="group"
              >
                <div className="bg-white dark:bg-black rounded-md overflow-hidden shadow hover:shadow-lg">
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={blog?.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-4 group-hover:bg-gray-100 dark:group-hover:bg-[rgb(10,10,10)]">
                    <h2 className="text-lg dark:font-normal font-[450] text-gray-800 dark:text-gray-100 dark:group-hover:text-gray-300 transition">
                      {blog?.title}
                    </h2>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mt-10">
          <CreateBlogButton />
        </div>
      </div>
    </>
  );
}
