"use client";
import { use, useEffect, useState } from "react";
import CoursePageRenderer from "@/components/CoursePageRenderer";
import CourseListRenderer from "@/components/CourseListRenderer";
import Protection from "@/components/Protection";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const COURSE_LIST_PAGES = [
  "classN1",
  "classN2",
  "classN3",
  "classN4",
  "classN5",
  "bjfunda",
  "bjBasic",
  "bjBasicInt",
  "bjInt",
  "bjIntAdv",
  "bjAdv",
  "bjAdvsup",
  "business-english-adv-classes",
  "business-english-inter-classes",
  "business-english-basic-classes",
  "kaiwa-classes",
  "eikaiwa-classes",
];

export default function CoursePageClient({ params }) {
  const { page: pageName } = use(params);

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPage() {
      try {
        const response = await fetch(
          `${API_BASE}/api/course-pages/${encodeURIComponent(pageName)}`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load course page.");
        }

        setPage(data.page);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load course page.");
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, [pageName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  const isCourseListPage = COURSE_LIST_PAGES.includes(pageName);

  return (
    <>
      <Protection />

      {isCourseListPage ? (
        <CourseListRenderer page={page} />
      ) : (
        <CoursePageRenderer page={page} />
      )}
    </>
  );
}
