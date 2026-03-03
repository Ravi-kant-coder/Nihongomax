"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";

/* ---------------- VALIDATION ---------------- */

const paragraphSchema = yup
  .string()
  .required("Required")
  .test("min-words", "Must be btwn 200-300", (value) => {
    if (!value) return false;
    const wordCount = value.trim().split(/\s+/).length;
    return wordCount >= 200;
  })
  .test("max-words", "Must not exceed 300 words", (value) => {
    if (!value) return false;
    const wordCount = value.trim().split(/\s+/).length;
    return wordCount <= 300;
  });

const schema = yup.object().shape({
  title: yup.string().required(),
  metaTitle: yup.string(),
  metaDescription: yup.string(),
  keywords: yup.string(),

  segment1Heading: yup.string().required(),
  segment1Text: paragraphSchema,

  segment2Heading: yup.string().required(),
  segment2Text: paragraphSchema,

  segment3Heading: yup.string().required(),
  segment3Text: paragraphSchema,
});

/* ---------------- COMPONENT ---------------- */

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [imagePreview3, setImagePreview3] = useState(null);

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const segment1Text = watch("segment1Text", "");
  const segment2Text = watch("segment2Text", "");
  const segment3Text = watch("segment3Text", "");

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  const handleImagePreview = (e, previewSetter, fileSetter) => {
    const file = e.target.files[0];
    if (file) {
      previewSetter(URL.createObjectURL(file));
      fileSetter(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      const slug = generateSlug(data.title);

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      formData.append("slug", slug);

      if (image1) formData.append("media", image1);
      if (image2) formData.append("media", image2);
      if (image3) formData.append("media", image3);

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert("Blog is Posted!");
      router.push("/information");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        <input
          {...register("title")}
          placeholder="Blog Title"
          className="w-full p-2 text-2xl font-semibold border dark:border-gray-500 border-gray-400 rounded-lg"
        />

        {/* SEGMENT 1 */}
        <section className="space-y-4 flex flex-col">
          <div className="flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImagePreview(e, setImagePreview1, setImage1)
              }
              className="border dark:border-gray-500 border-gray-400 rounded p-2 w-30 h-30 cursor-pointer"
            />
            {imagePreview1 && (
              <img
                src={imagePreview1}
                alt="preview"
                className="w-full max-h-[400px] object-contain"
              />
            )}
          </div>

          <input
            {...register("segment1Heading")}
            placeholder="Para 1 Heading"
            className="text-xl font-semibold border dark:border-gray-500 border-gray-400 rounded p-2"
          />

          <textarea
            {...register("segment1Text")}
            placeholder="Paragraph 1"
            className="input h-40 border dark:border-gray-500 border-gray-400 rounded p-2"
          />

          <span className="text-red-800 text-sm">
            {segment1Text.trim().split(/\s+/).length} &nbsp;
            {errors.segment1Text?.message}
          </span>
        </section>

        {/* SEGMENT 2 */}
        <section className="space-y-4 flex flex-col">
          <div className="flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImagePreview(e, setImagePreview2, setImage2)
              }
              className="border dark:border-gray-500 border-gray-400 rounded p-2 w-30 h-30 cursor-pointer"
            />

            {imagePreview2 && (
              <img
                src={imagePreview2}
                alt="preview"
                className="w-full max-h-[400px] object-contain"
              />
            )}
          </div>

          <input
            {...register("segment2Heading")}
            placeholder="Paragraph 2 Heading"
            className="text-xl font-semibold border dark:border-gray-500 border-gray-400 rounded p-2"
          />

          <textarea
            {...register("segment2Text")}
            placeholder="Paragraph 2"
            className="input h-40 border dark:border-gray-500 border-gray-400 rounded p-2"
          />

          <span className="text-red-800 text-sm">
            {segment2Text.trim().split(/\s+/).length} &nbsp;
            {errors.segment2Text?.message}
          </span>
        </section>

        {/* SEGMENT 3 */}
        <section className="space-y-4 flex flex-col">
          <div className="flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImagePreview(e, setImagePreview3, setImage3)
              }
              className="border dark:border-gray-500 border-gray-400 rounded p-2 w-30 h-30 cursor-pointer"
            />

            {imagePreview3 && (
              <img
                src={imagePreview3}
                alt="preview"
                className="w-full max-h-[400px] object-contain"
              />
            )}
          </div>

          <input
            {...register("segment3Heading")}
            placeholder="Paragraph 3 Heading"
            className="text-xl font-semibold border dark:border-gray-500 border-gray-400 rounded p-2"
          />

          <textarea
            {...register("segment3Text")}
            placeholder="Paragraph 3"
            className="input h-40 border dark:border-gray-500 border-gray-400 rounded p-2"
          />
          <span className="text-red-800 text-sm">
            {segment3Text.trim().split(/\s+/).length} &nbsp;
            {errors.segment3Text?.message}
          </span>
        </section>

        <button
          type="submit"
          disabled={!isValid || loading}
          className="bg-gray-800 text-white px-6 py-3 rounded-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer hover:bg-black
           dark:bg-gray-500 hover:dark:bg-gray-300"
        >
          {loading ? "Creating..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}
