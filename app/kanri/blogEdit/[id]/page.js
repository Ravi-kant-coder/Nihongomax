"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

/* ---------------- HELPERS ---------------- */

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

  keywords: yup.string().required("Keywords required"),

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

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();

  const id = params?.id ? String(params.id) : null;

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);

  /* ---------------- RHF ---------------- */

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      title: "",
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      content: "",
    },
  });

  /* --------------------------- FETCH BLOG ---------------------------- */

  useEffect(() => {
    if (!id) return;

    const init = async () => {
      try {
        /* -------- AUTH CHECK -------- */

        const authRes = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`,
          { withCredentials: true },
        );

        const userId = authRes?.data?.data?.userId;

        if (!userId || userId !== process.env.NEXT_PUBLIC_ADMIN_ID) {
          router.replace("/");
          return;
        }

        /* -------- FETCH BLOG DATA -------- */
        const blogRes = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/admin/${id}`,
          { withCredentials: true },
        );

        const blogData = blogRes?.data?.data || blogRes?.data;

        if (!blogData) return;

        setImagePreview(blogData?.featuredImage?.url || null);

        reset({
          title: blogData.title || "",
          metaTitle: blogData.metaTitle || "",
          metaDescription: blogData.metaDescription || "",
          keywords: blogData.keywords || "",
          content: blogData.content || "",
        });
      } catch (err) {
        console.error("Edit Blog Error:", err);
      }
    };

    init();
  }, [id, reset, router]);

  /* ---------------- WATCH ---------------- */

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

  /* ---------------- WORD COUNT ---------------- */

  const wordCount = countWords(contentValue);

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

      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/admin/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert("Blog Updated");

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
          <input
            {...register("title")}
            placeholder="Blog Title"
            className="w-full p-3 text-2xl font-semibold border border-gray-400 rounded-lg"
          />
          <p className="text-red-600 text-sm">{errors.title?.message}</p>
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagePreview}
            className="border rounded p-2 cursor-pointer border-gray-400"
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
          <input
            {...register("metaTitle")}
            placeholder="Meta Title"
            className="w-full p-2 border rounded border-gray-400"
          />

          <p className="text-sm text-gray-500">
            Characters: {metaTitleValue.length}
          </p>

          <p className="text-red-600 text-sm">{errors.metaTitle?.message}</p>
        </div>

        <div>
          <textarea
            {...register("metaDescription")}
            placeholder="Meta Description"
            className="w-full p-2 border rounded h-20 border-gray-400"
          />

          <p className="text-sm text-gray-500">
            Characters: {metaDescValue.length}
          </p>

          <p className="text-red-600 text-sm">
            {errors.metaDescription?.message}
          </p>
        </div>

        <div>
          <input
            {...register("keywords")}
            placeholder="keyword1, keyword2, keyword3"
            className="w-full p-2 border rounded border-gray-400"
          />

          <p className="text-sm text-gray-500">
            Keywords:{" "}
            {keywordsValue
              ? keywordsValue.split(",").filter((k) => k.trim()).length
              : 0}
          </p>
        </div>

        <div>
          <textarea
            {...register("content")}
            placeholder="Write your blog"
            className="w-full h-[500px] p-4 border rounded-md font-mono text-sm border-gray-400"
          />

          <p className="text-sm text-gray-600">Word Count: {wordCount}</p>

          <p className="text-red-600 text-sm">{errors.content?.message}</p>
        </div>

        <button
          type="submit"
          disabled={!isValid || loading}
          className="bg-black text-white px-6 py-3 rounded-md disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
}
