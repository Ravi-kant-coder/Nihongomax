"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { slugify } from "@/lib/slugify";
import { createBlog } from "./serverActions";

const schema = yup.object({
  title: yup.string().required(),
  segment1Heading: yup.string().required(),
  segment1Text: yup.string().required(),
  segment2Heading: yup.string().required(),
  segment2Text: yup.string().required(),
  segment3Heading: yup.string().required(),
  segment3Text: yup.string().required(),
});

const NewBlogPage = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const slug = slugify(data.title);

    await createBlog({
      ...data,
      slug,
      metaTitle: data.title,
      metaDescription: data.segment1Text.slice(0, 150),
    });

    alert("Blog created!");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-10 bg-accent"
    >
      <input {...register("title")} placeholder="Title" />

      <input {...register("segment1Heading")} placeholder="Heading 1" />
      <textarea {...register("segment1Text")} placeholder="Paragraph 1" />
      <input {...register("image1")} placeholder="Image URL 1" />

      <input {...register("segment2Heading")} placeholder="Heading 2" />
      <textarea {...register("segment2Text")} placeholder="Paragraph 2" />
      <input {...register("image2")} placeholder="Image URL 2" />

      <input {...register("segment3Heading")} placeholder="Heading 3" />
      <textarea {...register("segment3Text")} placeholder="Paragraph 3" />
      <input {...register("image3")} placeholder="Image URL 3" />

      <button type="submit">Create Blog</button>
    </form>
  );
};
export default NewBlogPage;
