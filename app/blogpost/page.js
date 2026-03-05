"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";

/* ---------------- VALIDATION ---------------- */

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  metaTitle: yup.string(),
  metaDescription: yup.string(),
  keywords: yup.string(),
  content: yup
    .string()
    .required("Content is required")
    .test("word-count", "Content should be at least 500 words", (value) => {
      if (!value) return false;
      const words = value.trim().split(/\s+/);
      return words.length >= 500;
    }),
});

/* ---------------- COMPONENT ---------------- */

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);

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

  const countWords = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

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
    try {
      setLoading(true);

      const formData = new FormData();
      const slug = generateSlug(data.title);

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      formData.append("slug", slug);

      if (featuredImage) {
        formData.append("featuredImage", featuredImage);
      }

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
      router.push("/information");
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
        {/* TITLE */}
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            Main blog Title. Include your primary keyword naturally.
          </p>
          <input
            {...register("title")}
            placeholder="Blog Title"
            className="w-full p-3 text-2xl font-semibold border border-gray-400 rounded-lg"
          />
          <p className="text-red-600 text-sm">{errors.title?.message}</p>
        </div>

        {/* FEATURED IMAGE */}
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            Image Required (Recommended: High quality landscape).
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

        {/* META TITLE */}
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            SEO Title (50–60 characters). Put main keyword first. Example: Title
            keyword | Nihongomax
          </p>
          <input
            {...register("metaTitle")}
            placeholder="Meta Title"
            className="w-full p-2 border rounded border-gray-400"
          />
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Characters now: {metaTitleValue.length} (Ideal: 50–60)
          </p>
        </div>

        {/* META DESCRIPTION */}
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            SEO Description (140–160 characters). Show clear benefit. Less
            keyword stuffing. Natural flow.
          </p>
          <textarea
            {...register("metaDescription")}
            placeholder="Meta Description"
            className="w-full p-2 border rounded h-20 border-gray-400"
          />
          <p className={`text-sm  ${metaDescColor}`}>
            Characters: {metaDescValue.length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {" "}
            Ideal: 140–160
          </p>
        </div>

        {/* KEYWORDS */}
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            4–8 related keywords. Comma separated. Think Yourself: "What would
            someone type in Google?"
          </p>
          <input
            {...register("keywords")}
            placeholder="keyword1, keyword2, keyword3"
            className="w-full p-2 border rounded border-gray-400"
          />
          <p className="text-xs text-gray-500">
            Total Keywords:{" "}
            {keywordsValue
              ? keywordsValue.split(",").filter((k) => k.trim()).length
              : 0}
          </p>
        </div>

        {/* CONTENT */}
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            Write your full paragraph using these symbols in between for:
            <br />
            For Headings: # for Big heading, ## for sub-heading
            <br />
            For Bold: **text**
            <br />
            Make 3-4 Links like: [The target words](https://google.com)
            <br />
            List with round Bullets: - item
            <br />
            Enter starts a new paragraph
          </p>

          <textarea
            {...register("content")}
            placeholder="Write your full blog here using Above rules"
            className="w-full h-[500px] p-4 border rounded-md font-mono text-sm border-gray-400"
          />

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Word Count: {countWords(contentValue)} (Required 1000 to 1400 words)
          </p>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={!isValid || loading}
          className="bg-black text-white px-6 py-3 rounded-md disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}
