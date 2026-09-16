"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CoursePageRenderer from "@/components/CoursePageRenderer";
import CourseListRenderer from "@/components/CourseListRenderer";
import Protection from "@/components/Protection";
import useAuthModalStore from "@/store/authModalStore";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

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

  const router = useRouter();

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPage() {
      try {
        setLoading(true);
        setError("");

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
          /*
           * Logged-out user tried to access a paid page.
           *
           * Normally CourseListRenderer catches this before
           * navigation and opens AuthModal. This is still
           * handled here because somebody may directly enter
           * a paid course URL.
           */
          if (data.code === "LOGIN_REQUIRED") {
            if (isMounted) {
              setLoading(false);
              setError("");
              useAuthModalStore.getState().openModal();
            }

            return;
          }

          /*
           * Logged-in user has no active subscription.
           *
           * Send them to the existing payment page.
           */
          if (data.code === "SUBSCRIPTION_REQUIRED") {
            router.replace("/payment");
            return;
          }

          throw new Error(data.message || "Failed to load course page.");
        }

        if (!isMounted) {
          return;
        }

        setPage(data.page);
      } catch (err) {
        console.error("Course page loading error:", err);

        if (isMounted) {
          setError(err.message || "Failed to load course page.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPage();

    return () => {
      isMounted = false;
    };
  }, [pageName, router]);

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
