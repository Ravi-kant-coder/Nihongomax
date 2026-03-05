import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

/* ---------------- FETCH BLOG ---------------- */

async function getBlog(slug) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${slug}`,
    );
    console.log(res.data?.data);
    return res.data?.data || null;
  } catch (error) {
    return null;
  }
}

/* ---------------- FETCH ALL BLOGS ---------------- */

async function getAllBlogs() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`,
    );

    return res.data?.data || [];
  } catch (error) {
    return [];
  }
}

/* ---------------- STATIC PARAMS (IMPORTANT) ---------------- */

export async function generateStaticParams() {
  const blogs = await getAllBlogs();

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

/* ---------------- SEO METADATA ---------------- */

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog not found",
    };
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || "",
    keywords: blog.keywords || "",
  };
}

/* ---------------- CLOUDINARY OPTIMIZATION ---------------- */

function optimizeImage(url, width = 900) {
  if (!url || typeof url !== "string") return url;

  if (!url.includes("upload/")) return url;

  return url.replace("upload/", `upload/q_auto,f_auto,w_${width}/`);
}

/* ---------------- AUTO INTERNAL LINKING ---------------- */

function autoLinkContent(content, blogs, currentSlug) {
  if (!content) return content;

  let updatedContent = content;

  blogs.forEach((blog) => {
    if (!blog?.title || !blog?.slug) return;
    if (blog.slug === currentSlug) return;

    const regex = new RegExp(`\\b${blog.title}\\b`, "gi");

    updatedContent = updatedContent.replace(
      regex,
      `[${blog.title}](/information/${blog.slug})`,
    );
  });

  return updatedContent;
}

/* ---------------- PAGE ---------------- */

export default async function BlogPage({ params }) {
  const { slug } = await params;

  const blog = await getBlog(slug);
  const blogs = await getAllBlogs();

  if (!blog) return notFound();

  const relatedBlogs = blogs.filter((b) => b.slug !== slug).slice(0, 5);

  const linkedContent = autoLinkContent(blog.content, blogs, slug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-5xl font-bold mb-4 dark:text-gray-400 text-gray-700">
        {blog.title}
      </h1>
      <div className="lg:grid lg:grid-cols-4 lg:gap-12">
        <article className="lg:col-span-3">
          {blog?.featuredImage?.url && (
            <div className="float-left w-full sm:w-[45%] mr-6 mb-2">
              <Image
                src={optimizeImage(blog.featuredImage.url)}
                alt={blog.title}
                width={800}
                height={500}
                className="rounded-xl object-cover w-full h-auto"
                priority
              />
            </div>
          )}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} target="_blank" rel="noopener noreferrer" />
                ),
              }}
            >
              {linkedContent}
            </ReactMarkdown>
          </div>
          <div className="clear-both"></div>
        </article>

        <aside className="space-y-4">
          <h3 className="text-xl font-semibold">You may also like:</h3>
          {relatedBlogs.map((item) => (
            <Link
              key={item._id}
              href={`/information/${item.slug}`}
              className="flex justify-start items-center bg-gray-100 hover:bg-white dark:hover:bg-gray-800 rounded-lg dark:bg-black"
            >
              <div className="w-10 h-10 m-2 rounded-full flex-shrink-0">
                <Image
                  src={optimizeImage(item.featuredImage.url)}
                  alt={blog.title}
                  width={100}
                  height={100}
                  className="rounded-full object-cover w-10 h-10"
                  priority
                />
              </div>
              <h4>{item.title}</h4>
            </Link>
          ))}
        </aside>
      </div>
    </div>
  );
}
