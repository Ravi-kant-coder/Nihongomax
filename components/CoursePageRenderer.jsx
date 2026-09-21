"use client";

import { coursePageUrl } from "../lib/coursePageUrl";
import { sanitizeHtml } from "../lib/sanitizeHtml";
export default function CoursePageRenderer({ page }) {
  if (!page || !Array.isArray(page.content)) {
    return null;
  }

  return (
    <article className="w-full bg-white py-8 rounded-4xl dark:bg-[#cfcfcf]">
      <div className="flex w-full flex-col items-center">
        {page.content.map((item, index) => {
          // ==========================================
          // IMAGE
          // ==========================================

          if (item.type === "image") {
            return (
              <div key={index} className="postblock w-full text-center">
                <img
                  src={item.src}
                  alt=""
                  className="lesson-image mx-auto h-auto dark:brightness-[0.8]"
                />
              </div>
            );
          }

          // ==========================================
          // AUDIO
          // ==========================================

          if (item.type === "audio") {
            return (
              <div key={index} className="postblock w-full text-center">
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    className="lesson-image mx-auto h-auto w-[80%] dark:brightness-[0.8]"
                  />
                )}

                {item.src && (
                  <audio
                    controls
                    controlsList="nodownload"
                    preload="metadata"
                    className="mx-auto my-3 w-[60%] max-w-[1000px]"
                  >
                    <source src={item.src} />
                    Your browser does not support audio.
                  </audio>
                )}
              </div>
            );
          }

          // ==========================================
          // IMAGE + AUDIO
          // ==========================================

          if (item.type === "image-audio") {
            return (
              <div key={index} className="postblock w-full text-center">
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    className="lesson-image mx-auto h-auto dark:brightness-[0.8]"
                  />
                )}

                {item.audio && (
                  <audio
                    controls
                    controlsList="nodownload"
                    preload="metadata"
                    className="mx-auto my-3 w-[60%] max-w-[1000px]"
                  >
                    <source src={item.audio} />
                    Your browser does not support audio.
                  </audio>
                )}
              </div>
            );
          }

          // ==========================================
          // LINKED IMAGE
          // ==========================================

          if (item.type === "link-image") {
            const href = coursePageUrl(item.legacyHref || item.href);

            const isInternal = href.startsWith("/");

            return (
              <div key={index} className="postblock w-full text-center">
                <a
                  href={href}
                  target={isInternal ? undefined : "_blank"}
                  rel={isInternal ? undefined : "noopener noreferrer"}
                >
                  <img
                    src={item.src}
                    alt=""
                    className="lesson-image mx-auto h-auto dark:brightness-[0.8]"
                  />
                </a>
              </div>
            );
          }

          // ==========================================
          // TEXT LINK
          // ==========================================

          if (item.type === "link-text") {
            const href = coursePageUrl(item.legacyHref || item.href);

            const isInternal = href.startsWith("/");

            return (
              <div
                key={index}
                className="postblock w-full text-center course-html "
              >
                <a
                  href={href}
                  target={isInternal ? undefined : "_blank"}
                  rel={isInternal ? undefined : "noopener noreferrer"}
                  className="inline-block md:py-2"
                >
                  {item.text}
                </a>
              </div>
            );
          }

          // ==========================================
          // FALLBACK HTML
          // ==========================================

          if (item.type === "html") {
            return (
              <div
                key={index}
                className="postblock w-full"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(item.html),
                }}
              />
            );
          }

          return null;
        })}
      </div>
    </article>
  );
}
