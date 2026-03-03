import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "All Japanese Learning Blogs | NihongoMax",
  description:
    "Explore Japanese grammar, JLPT preparation, kanji, and learning guides.",
};

export const revalidate = 60;

async function getBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  const data = await res.json();
  const newBlog = data.data;
  return newBlog;
}

export default async function InformationPage() {
  const blogs = await getBlogs();

  const optimizeImage = (url, width = 400) => {
    if (!url || !url.includes("upload/")) return url;
    return url.replace("upload/", `upload/q_auto,f_auto,w_${width}/`);
  };

  return (
    <div className="flex flex-wrap">
      {blogs.map((blog) => {
        const imageUrl = blog?.uploadedMedia?.[0]?.url
          ? optimizeImage(blog.uploadedMedia[0].url, 400)
          : "/fujisan.png";

        return (
          <Link
            key={blog?._id}
            href={`/information/${blog?.slug}`}
            className="block w-56 m-2"
          >
            <div
              className="bg-white dark:bg-black rounded p-2 
          cursor-pointer overflow-hidden
          dark:hover:bg-[rgb(50,50,50)] 
          flex flex-col items-center 
          shadow hover:shadow-gray-500 transition"
            >
              <div className="relative w-full aspect-square overflow-hidden rounded mb-2">
                <Image
                  src={imageUrl}
                  alt={blog?.title}
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-gray-800 dark:text-gray-300 text-sm capitalize font-semibold w-full text-center">
                {blog?.title}
              </h2>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
