import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditBlogButton from "@/app/components/EditBlogButton";
import { getBlogs } from "@/lib/blog";

/* ---------------- FETCH ONE BLOG ---------------- */

async function getBlog(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${slug}`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return null;

    const data = await res.json();

    return data?.data || null;
  } catch (error) {
    return null;
  }
}

/* ---------------- STATIC PARAMS ---------------- */

export async function generateStaticParams() {
  const blogs = await getBlogs();

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

/* ---------------- METADATA ---------------- */

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

    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.metaDescription,
      images: blog?.featuredImage?.url
        ? [optimizeImage(blog.featuredImage.url)]
        : [],
      type: "article",
    },

    alternates: {
      canonical: `/blogs/${slug}`,
    },
  };
}

/* ---------------- CLOUDINARY IMAGE ---------------- */

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
      `[${blog.title}](/blogs/${blog.slug})`,
    );
  });

  return updatedContent;
}

/* ---------------- GENERATE TABLE OF CONTENTS ---------------- */

function generateTOC(content) {
  if (!content) return [];

  const headingRegex = /^(#|##|###)\s+(.*)/gm;

  const headings = [];
  const slugCount = {};

  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2];

    let baseId = text
      .toLowerCase()
      .replace(/[^\w]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // ensure unique ids
    if (slugCount[baseId]) {
      slugCount[baseId] += 1;
      baseId = `${baseId}-${slugCount[baseId]}`;
    } else {
      slugCount[baseId] = 1;
    }

    headings.push({
      text,
      id: baseId,
      level: match[1] === "#" ? 1 : match[1] === "##" ? 2 : 3,
    });
  }

  return headings;
}

/* ---------------- PAGE ---------------- */

export default async function BlogPage({ params }) {
  const { slug } = await params;

  const blog = await getBlog(slug);
  const blogs = await getBlogs();

  if (!blog) return notFound();

  const relatedBlogs = blogs.filter((b) => b.slug !== slug).slice(0, 5);

  const linkedContent = autoLinkContent(blog.content, blogs, slug);

  const toc = generateTOC(blog.content);

  const wordCount = blog.content?.split(/\s+/).length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="max-w-8xl mx-auto px-4 py-10">
      <h1 className="text-5xl font-bold mb-4 dark:text-gray-300 text-gray-700">
        {blog.title}
      </h1>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: blog.metaDescription || blog.excerpt,
            image: blog?.featuredImage?.url,
            datePublished: blog.createdAt,
            dateModified: blog.updatedAt,
            author: {
              "@type": "Organization",
              name: "Nihongomax",
            },
          }),
        }}
      />

      <div className="lg:grid lg:grid-cols-4 lg:gap-12">
        <article
          className="lg:col-span-3"
          itemScope
          itemType="https://schema.org/Article"
        >
          <p className="mb-2">{readingTime} min read</p>
          <div className="mb-8 rounded-xl bg-gray-200 dark:bg-[rgb(20,20,20)] sm:flex overflow-hidden">
            {blog?.featuredImage?.url && (
              <div className="w-full sm:w-[45%]">
                <Image
                  src={optimizeImage(blog.featuredImage.url)}
                  alt={blog.title}
                  width={800}
                  height={500}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            )}

            {toc.length > 0 && (
              <div className="flex flex-col p-2 ml-2 flex-1">
                <h2 className="font-[450] text-lg mb-2 dark:text-gray-300">
                  Table of Contents
                </h2>

                <ul className="space-y-1 text-sm dark:text-gray-400">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="hover:underline">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => {
                  const text = Array.isArray(children)
                    ? children.join("")
                    : children;

                  const id = text
                    .toString()
                    .toLowerCase()
                    .replace(/[^\w]+/g, "-")
                    .replace(/^-+|-+$/g, "");

                  return (
                    <h1
                      className="scroll-mt-20 dark:text-gray-200 text-gray-700"
                      id={id}
                    >
                      {children}
                    </h1>
                  );
                },

                h2: ({ children }) => {
                  const text = Array.isArray(children)
                    ? children.join("")
                    : children;

                  const id = text
                    .toString()
                    .toLowerCase()
                    .replace(/[^\w]+/g, "-")
                    .replace(/^-+|-+$/g, "");

                  return (
                    <h2
                      className="scroll-mt-20 dark:text-gray-300 text-gray-600"
                      id={id}
                    >
                      {children}
                    </h2>
                  );
                },

                h3: ({ children }) => {
                  const text = Array.isArray(children)
                    ? children.join("")
                    : children;

                  const id = text
                    .toString()
                    .toLowerCase()
                    .replace(/[^\w]+/g, "-")
                    .replace(/^-+|-+$/g, "");

                  return (
                    <h3
                      className="scroll-mt-20 dark:text-gray-400 text-gray-600"
                      id={id}
                    >
                      {children}
                    </h3>
                  );
                },

                a: ({ href, children, ...props }) => {
                  const isInternal = href?.startsWith("/");

                  if (isInternal) {
                    return (
                      <Link href={href} {...props}>
                        {children}
                      </Link>
                    );
                  }

                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    >
                      {children}
                    </a>
                  );
                },
              }}
            >
              {linkedContent}
            </ReactMarkdown>
          </div>

          <div className="clear-both"></div>

          <EditBlogButton blogId={blog._id} />
        </article>

        <aside className="space-y-4">
          <h3 className="text-xl font-semibold dark:text-gray-400 text-gray-600">
            You may also like:
          </h3>

          {relatedBlogs.map((item) => (
            <Link
              key={item._id}
              href={`/blogs/${item.slug}`}
              className="flex justify-start items-center bg-gray-100 hover:bg-white dark:hover:bg-gray-800 rounded-lg dark:bg-black"
            >
              <div className="w-10 h-10 m-2 rounded-full flex-shrink-0">
                <Image
                  src={optimizeImage(item.featuredImage.url)}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="rounded-full object-cover w-10 h-10"
                  loading="lazy"
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
