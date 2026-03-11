"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/* ---------------- HELPERS FOR VALIDATION ---------------- */

const countWords = (text) => {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
};

/* ---------------- VALIDATION ---------------- */

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(10, "Title should be at least 10 characters")
    .max(70, "Title should not exceed 70 characters"),

  metaTitle: yup
    .string()
    .required("Meta title required")
    .min(50, "Meta title should be at least 50 characters")
    .max(60, "Meta title should not exceed 60 characters"),

  metaDescription: yup
    .string()
    .required("Meta description required")
    .min(140, "Meta description should be at least 140 characters")
    .max(160, "Meta description should not exceed 160 characters"),

  keywords: yup
    .string()
    .required("Keywords required")
    .test(
      "keyword-count",
      "Provide between 4 and 10 keywords separated by commas",
      (value) => {
        if (!value) return false;
        const keywords = value
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean);
        return keywords.length >= 4 && keywords.length <= 10;
      },
    ),

  content: yup
    .string()
    .required("Content is required")
    .test(
      "word-count",
      "Content should be between 1000 and 1400 words",
      (value) => {
        const words = countWords(value);
        return words >= 1000 && words <= 1400;
      },
    ),
});

/* ---------------- COMPONENT ---------------- */

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`,
          { withCredentials: true },
        );

        if (
          !res?.data?.data?.userId ||
          res.data.data?.userId !== process.env.NEXT_PUBLIC_ADMIN_ID
        ) {
          router.replace("/");
        }
      } catch (error) {
        router.replace("/");
      }
    }

    checkUser();
  }, [router]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  /* ---------------- WATCH VALUES ---------------- */

  const contentValue = watch("content", "");
  const metaTitleValue = watch("metaTitle", "");
  const metaDescValue = watch("metaDescription", "");
  const keywordsValue = watch("keywords", "");

  /* ---------------- HELPERS ---------------- */

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFeaturedImage(file);
    }
  };

  /* ---------------- COLORED FEEDBACK ---------------- */

  const wordCount = countWords(contentValue);

  const contentColor =
    wordCount === 0
      ? "text-gray-600 dark:text-gray-400"
      : wordCount < 1000
        ? "text-red-600"
        : wordCount <= 1400
          ? "text-green-700 dark:text-green-500"
          : "text-red-600";

  const metaDescLength = metaDescValue.length;

  const metaDescColor =
    metaDescLength === 0
      ? "text-gray-600 dark:text-gray-400"
      : metaDescLength < 140
        ? "text-red-600"
        : metaDescLength <= 160
          ? "text-green-700 dark:text-green-500"
          : "text-red-600";

  /* ---------------- SUBMIT ---------------- */

  const onSubmit = async (data) => {
    if (!featuredImage) {
      alert("Featured image is required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      const slug = generateSlug(data.title);

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      formData.append("slug", slug);
      formData.append("featuredImage", featuredImage);

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/admin`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert("Blog Published!");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-20">
        <div>
          <p className="mb-1">
            Main blog Title. Include your primary keyword naturally.
          </p>

          <input
            {...register("title")}
            placeholder="Blog Title"
            className="w-full p-3 text-2xl font-semibold border border-gray-400 rounded-lg"
          />

          <p className="text-red-600 text-sm">{errors.title?.message}</p>
        </div>

        <div>
          <p className="mb-1">
            Image Required (Matching with the theme of the blog) Square or
            little horizontal.
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleImagePreview}
            className="border rounded p-2 cursor-pointer border-gray-400 hover:bg-gray-400 dark:hover:bg-gray-800"
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="w-full max-h-[400px] object-contain mt-2"
            />
          )}
        </div>

        <div>
          <p className="mb-1">
            SEO Title (50–60 characters). Put main keyword first. Example: Title
            keyword | Nihongomax
          </p>

          <input
            {...register("metaTitle")}
            placeholder="Meta Title"
            className="w-full p-2 border rounded border-gray-400"
          />

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Characters now: {metaTitleValue.length}
            <br />
            (Ideal: 50–60)
          </p>

          <p className="text-red-600 text-sm">{errors.metaTitle?.message}</p>
        </div>

        <div>
          <p className="mb-1">SEO Description (140–160 characters).</p>

          <textarea
            {...register("metaDescription")}
            placeholder="Meta Description"
            className="w-full p-2 border rounded h-20 border-gray-400"
          />

          <p className={`text-sm ${metaDescColor}`}>
            Characters: {metaDescValue.length}
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ideal: 140–160
          </p>

          <p className="text-red-600 text-sm">
            {errors.metaDescription?.message}
          </p>
        </div>

        <div>
          <p className="mb-1">4–10 related keywords. Comma separated.</p>

          <input
            {...register("keywords")}
            placeholder="First keyword, Second, Third keyword"
            className="w-full p-2 border rounded border-gray-400"
          />

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Keywords:{" "}
            {keywordsValue
              ? keywordsValue.split(",").filter((k) => k.trim()).length
              : 0}
            <br />
            Ideal 4 to 10
          </p>

          <p className="text-red-600 text-sm">{errors.keywords?.message}</p>
        </div>

        <div>
          <p>Please read this carefully before adding the content.</p>
          <textarea
            {...register("content")}
            placeholder={`# Main Article Heading (5–6 words)

Write ~200 words introduction here.
## Section Heading (5–6 words)

Write ~200 words explaining the topic.
## Another Section Heading

Write around 15-16 FAQs. The questions should be the ###heading. Also there must be 2-3 external and 2-3 interal links.
For example

### FAQ Question One
Answer in 40–60 words.

### FAQ Question Two
Answer in 40–60 words.

External link example:
[our institute to learn Japanese](https://learnjapanesedelhi.com)

Internal link example:
[for the ways to Learn Japanese Fast](/blogs/how-to-learn-japanese-fast)

Goal:
• Total ~1200 words
• 1 or 2 #headings
• 1 or 2 ##headings
• 15–16 FAQs questions in ###headings
Please ask us if anything is unclear
`}
            className="w-full h-[500px] p-4 border rounded-md font-mono text-sm border-gray-400"
          />

          <p className={`text-sm ${contentColor}`}>Word Count: {wordCount}</p>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ideal: 1000 to 1400 words
          </p>

          <p className="text-red-600 text-sm">{errors.content?.message}</p>
        </div>

        <button
          type="submit"
          disabled={!isValid || loading}
          className="bg-black text-white px-6 py-3 rounded-md disabled:opacity-50 cursor-pointer hover:bg-gray-800"
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}
