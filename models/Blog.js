const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    metaTitle: String,
    metaDescription: String,
    keywords: String,

    segment1Heading: String,
    segment1Text: String,
    image1: String,

    segment2Heading: String,
    segment2Text: String,
    image2: String,

    segment3Heading: String,
    segment3Text: String,
    image3: String,
  },
  { timestamps: true },
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
