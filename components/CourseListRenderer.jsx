"use client";

import { coursePageUrl } from "../lib/coursePageUrl";
import { sanitizeHtml } from "../lib/sanitizeHtml";

export default function CourseListRenderer({ page }) {
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
            <div className="mb-8 flex w-full justify-center">
              <a
                href={coursePageUrl(howToStudy.legacyHref || howToStudy.href)}
                className="block"
              >
                <img
                  src={howToStudy.src}
                  alt="How to Study"
                  className="
                    h-auto
                    w-auto
                    max-w-[500px]
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
    </article>
  );
}
