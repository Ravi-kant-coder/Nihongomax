import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 60;

// Optimize Cloudinary image
function optimizeImage(url, width = 900) {
  if (!url || !url.includes("upload/")) return url;
  return url.replace("upload/", `upload/q_auto,f_auto,w_${width}/`);
}

// Fetch single blog
async function getBlog(slug) {
  if (!slug) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${slug}`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) return null;

  const json = await res.json();
  const blog = json?.data;

  if (!blog || typeof blog !== "object") return null;

  return blog;
}

// Fetch all blogs
async function getAllBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];

  const json = await res.json();
  const blogs = json?.data;

  if (!Array.isArray(blogs)) return [];

  return blogs;
}

// Pre-build static params
export async function generateStaticParams() {
  const blogs = await getAllBlogs();

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// Dynamic Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog not found | NihongoMax",
    };
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || "",
    keywords: blog.keywords || "",
  };
}

// Page
export default async function BlogPage({ params }) {
  const { slug } = await params;

  const blog = await getBlog(slug);
  if (!blog) return notFound();

  const allBlogs = await getAllBlogs();
  const relatedBlogs = allBlogs.filter((b) => b.slug !== blog.slug);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.metaDescription,
    author: {
      "@type": "Organization",
      name: "NihongoMax",
      url: "https://www.nihongomax.com",
    },
    datePublished: blog.createdAt,
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 px-6 lg:px-10 py-10">
      <article className="flex-1 max-w-4xl space-y-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-300 text-center">
          {blog.title}
        </h1>
        {[1, 2, 3].map((num, index) => {
          const image = blog.uploadedMedia?.[index];
          const heading = blog[`segment${num}Heading`];
          const text = blog[`segment${num}Text`];

          if (!heading || !text || !image) return null;

          return (
            <section key={num} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-300">
                {heading}
              </h2>

              <div className="text-lg text-gray-700 dark:text-gray-400">
                <div className="float-left w-full md:w-[30%] mr-4">
                  <Image
                    src={optimizeImage(image.url, 600)}
                    alt={heading}
                    width={600}
                    height={400}
                    sizes="(max-width: 640px) 100vw, 30vw"
                    className="rounded-lg object-cover w-full h-auto"
                    priority={num === 1}
                  />
                </div>
                <p className="whitespace-pre-line">{text}</p>
                {/* Clear float after section */}
                <div className="clear-both" />
              </div>
            </section>
          );
        })}
      </article>

      <aside className="w-full lg:w-72">
        <h2 className="text-2xl font-semibold mb-4 text-gray-600 dark:text-gray-400">
          You may also like:
        </h2>

        <div className="space-y-3">
          {relatedBlogs.map((item) => (
            <Link key={item._id} href={`/information/${item.slug}`}>
              <div
                className="bg-gray-200 dark:bg-[rgb(60,60,60)] rounded-md p-3 hover:bg-white dark:hover:bg-[rgb(70,70,70)] cursor-pointer 
              text-sm text-gray-800 dark:text-gray-300 mb-2"
              >
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}
