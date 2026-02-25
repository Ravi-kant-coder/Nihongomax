import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  await connectDB();

  const { slug } = await params;

  const blog = await Blog.findOne({ slug }).lean();

  if (!blog) {
    return {
      title: "Blog not found",
    };
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription,
    keywords: blog.keywords,
  };
}

export default async function BlogPage({ params }) {
  await connectDB();

  const { slug } = await params;

  const blog = await Blog.findOne({ slug }).lean();

  if (!blog) return notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.metaDescription,
    author: {
      "@type": "Person",
      name: "Ravi Kant",
    },
    datePublished: blog.createdAt,
  };

  return (
    <article className="max-w-4xl mx-auto p-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <h1 className="text-4xl font-bold">{blog.title}</h1>

      {[1, 2, 3].map((num) => (
        <section key={num} className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {blog[`segment${num}Heading`]}
          </h2>

          {blog[`image${num}`] && (
            <Image
              src={blog[`image${num}`]}
              alt={blog[`segment${num}Heading`]}
              width={800}
              height={500}
              className="rounded-lg"
            />
          )}

          <p className="text-lg leading-8 whitespace-pre-line">
            {blog[`segment${num}Text`]}
          </p>
        </section>
      ))}
    </article>
  );
}
