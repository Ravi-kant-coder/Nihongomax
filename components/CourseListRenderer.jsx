"use client";
import { useState } from "react";
import { coursePageUrl } from "../lib/coursePageUrl";
import { sanitizeHtml } from "../lib/sanitizeHtml";
import { requireAuth } from "@/lib/requireAuth";
import Spinner from "@/components/Spinner";

const FREE_PAGES = new Set([
  // JLPT
  "aboutjlpt",

  "classN1",
  "classN2",
  "classN3",
  "classN4",
  "classN5",

  "n5howtostudy",
  "n5overview",
  "n5class1",
  "n5class2",

  "n4howtostudy",
  "n4overview",
  "n4class1",
  "n4class2",

  "n3howtostudy",
  "n3overview",
  "n3class1",
  "n3class2",

  "n2howtostudy",
  "n2overview",
  "n2class1",
  "n2class2",

  "n1howtostudy",
  "n1overview",
  "n1class1",
  "n1class2",

  "hiragana",

  // Business Japanese
  "aboutbj",

  "bjfunda",
  "bjBasic",
  "bjBasicInt",
  "bjInt",
  "bjIntAdv",
  "bjAdv",
  "bjAdvsup",
  "howtostudybj",

  "funda_overview",
  "basic_overview",
  "basic_inter_overview",
  "inter_overview",
  "inter_adv_overview",
  "adv_overview",
  "super_adv_overview",

  "bjclass1",
  "bjclass2",
  "bjclass11",
  "bjclass12",
  "bjclass21",
  "bjclass22",
  "bjclass31",
  "bjclass32",
  "bjclass41",
  "bjclass42",
  "bjclass51",
  "bjclass52",
  "bjclass61",
  "bjclass62",

  // Kaiwa
  "kaiwa-classes",
  "kaiwa_overview",
  "howtostudykaiwa",
  "kaiwac1",
  "kaiwac2",

  // Eigo
  "aboutbe",

  "business-english-basic-classes",
  "business-english-inter-classes",
  "business-english-adv-classes",
  "hwtostdyeikawa",

  "be_sho_overview",
  "be_chu_overview",
  "be_jou_overview",

  "bizengc1",
  "bizengc2",
  "bizengc21",
  "bizengc22",
  "bizengc41",
  "bizengc42",

  "eikaiwa-classes",
  "eikaiwa_overview",
  "eikaiwac1",
  "eikaiwac2",

  "linkbundle",
  "linkbundlejap",
]);

function getCoursePageName(href) {
  if (!href || !href.startsWith("/course/")) {
    return null;
  }

  return href
    .replace(/^\/course\//, "")
    .split(/[?#]/)[0]
    .trim();
}

export default function CourseListRenderer({ page }) {
  const [isNavigating, setIsNavigating] = useState(false);
  if (!page || !Array.isArray(page.content)) {
    return null;
  }

  /*
   * Course-list pages normally contain:
   *
   * 1. Main course heading/banner image
   * 2. How-to-study image/link
   * 3. Overview + class buttons as link-image items
   */

  const headerItems = [];
  const linkItems = [];

  page.content.forEach((item) => {
    if (item.type === "link-image") {
      linkItems.push(item);
    } else {
      headerItems.push(item);
    }
  });

  /*
   * The first link-image is normally the
   * "How to Study" button.
   *
   * Everything after that belongs to
   * the course/class grid.
   */
  const howToStudy = linkItems[0];
  const courseButtons = linkItems.slice(1);

  /*
   * Course navigation rules:
   *
   * FREE_PAGES:
   *   Anyone can open them.
   *
   * Paid pages:
   *   Logged-out users -> existing AuthModal
   *   Logged-in users -> navigate normally
   *
   * The backend remains the final authority for
   * subscription access.
   */
  const handleCourseClick = (event, legacyHref) => {
    const href = coursePageUrl(legacyHref);

    if (!href || href === "#") {
      return;
    }

    // Only intercept internal course pages.
    if (!href.startsWith("/course/")) {
      return;
    }

    const pageName = getCoursePageName(href);

    /*
     * FREE PAGE
     *
     * Do not call requireAuth().
     * Anyone can access it.
     */
    if (pageName && FREE_PAGES.has(pageName)) {
      setIsNavigating(true);
      return;
    }

    /*
     * PAID PAGE
     *
     * Stop normal navigation and use the existing
     * authentication popup for logged-out users.
     */
    event.preventDefault();

    requireAuth(() => {
      window.location.href = href;
    });
  };

  return (
    <article className="w-full bg-white py-8 rounded-4xl dark:bg-[#cfcfcf]">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        {/* =========================
            COURSE HEADER
        ========================== */}
        <div className="flex flex-col items-center">
          {headerItems.map((item, index) => {
            if (item.type === "image") {
              return (
                <div
                  key={`header-${index}`}
                  className="mb-6 flex w-full justify-center"
                >
                  <img
                    src={item.src}
                    alt=""
                    className="h-auto w-auto max-w-full dark:brightness-[0.8]"
                  />
                </div>
              );
            }

            if (item.type === "audio") {
              return (
                <div
                  key={`header-audio-${index}`}
                  className="mb-6 flex w-full flex-col items-center"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt=""
                      className="h-auto max-w-full dark:brightness-[0.8]"
                    />
                  )}

                  {item.src && (
                    <audio
                      controls
                      controlsList="nodownload"
                      preload="metadata"
                      className="my-3 w-[80%] max-w-[1000px]"
                    >
                      <source src={item.src} />
                      Your browser does not support audio.
                    </audio>
                  )}
                </div>
              );
            }

            if (item.type === "html") {
              return (
                <div
                  key={`header-html-${index}`}
                  className="mb-6 w-full"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(item.html),
                  }}
                />
              );
            }

            return null;
          })}

          {/* =========================
              HOW TO STUDY
          ========================== */}
          {howToStudy && (
            <div className="mb-8 flex w-full justify-center px-2">
              <a
                href={coursePageUrl(howToStudy.legacyHref || howToStudy.href)}
                onClick={(event) =>
                  handleCourseClick(
                    event,
                    howToStudy.legacyHref || howToStudy.href,
                  )
                }
                className="block max-w-full"
              >
                <img
                  src={howToStudy.src}
                  alt="How to Study"
                  className="
        h-auto
        w-auto
        max-w-full
        md:max-w-[500px]
        max-h-[180px]
        object-contain
        transition-transform
        duration-200
        hover:scale-[1.03]
        dark:brightness-[0.8]
      "
                />
              </a>
            </div>
          )}
        </div>

        {/* =========================
            COURSE BUTTON GRID
        ========================== */}
        <div
          className="
            grid
            grid-cols-2
            gap-x-4
            gap-y-8
            sm:grid-cols-3
            sm:gap-x-6
            md:grid-cols-4
            lg:grid-cols-6
            lg:gap-x-8
            lg:gap-y-10
          "
        >
          {courseButtons.map((item, index) => {
            const href = coursePageUrl(item.legacyHref || item.href);

            return (
              <div
                key={`course-button-${index}`}
                className="flex justify-center"
              >
                <a
                  href={href}
                  onClick={(event) =>
                    handleCourseClick(event, item.legacyHref || item.href)
                  }
                  className="
                    block
                    w-full
                    max-w-[150px]
                    transition-transform
                    duration-200
                    hover:scale-105
                  "
                >
                  <img
                    src={item.src}
                    alt=""
                    className="
                      block
                      h-auto
                      w-full
                      object-contain
                      dark:brightness-[0.8]
                    "
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
      {isNavigating && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-sm">
          <Spinner />
        </div>
      )}
    </article>
  );
}
