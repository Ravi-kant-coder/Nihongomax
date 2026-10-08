"use client";
import { coursePageUrl } from "../lib/coursePageUrl";
import { sanitizeHtml } from "../lib/sanitizeHtml";
import CustomAudioPlayer from "@/components/CustomAudioPlayer";

export default function CoursePageRenderer({ page }) {
  if (!page || !Array.isArray(page.content)) {
    return null;
  }

  function getAudioLabel(imageUrl) {
    if (!imageUrl) {
      return null;
    }

    const filename = imageUrl.split("/").pop()?.split("?")[0]?.toLowerCase();

    const labels = {
      "hinditab.jpg": "Listen to Explanation in Hindi",
      "engtab.jpg": "Listen to Explanation in English",
      "listentojap.jpg": "Listen to Japanese",
      "listentodd.jpg": "Listen to Days and Dates",
      "listentomon.jpg": "Listen to Months",
      "listoconv.jpg": "Listen to this Conversation",
      "bunseki.jpg": "日本語での分析・説明",
      "shosai.jpg": "日本語での詳細を聞く",
      "renshu1.jpg": "英会話練習1",
      "renshu2.jpg": "英会話練習２",
      "practicekaiwa.jpg": "Practice Kaiwa",
      "overviewjap.jpg": "日本語での説明",
      "america.jpg": "発音（アメリカ）を聞く",
    };

    return labels[filename] || null;
  }

  return (
    <article className="w-full bg-white py-8 rounded-4xl dark:bg-[#cfcfcf]">
      <div className="flex w-full flex-col items-center">
        {page.content.map((item, index) => {
          if (item.type === "image") {
            return (
              <div key={index} className="postblock w-full text-center">
                <img
                  src={item.src}
                  alt=""
                  className="lesson-image mx-auto h-auto w-[95%] md:w-[80%] dark:brightness-[0.8]"
                />
              </div>
            );
          }
          if (item.type === "audio") {
            const audioLabel = getAudioLabel(item.image);

            return (
              <div key={index} className="postblock w-full text-center">
                {/* Show original image when it is NOT a label image */}
                {item.image && !audioLabel && (
                  <img
                    src={item.image}
                    alt=""
                    className="lesson-image mx-auto h-auto w-[95%] md:w-[80%] dark:brightness-[0.8]"
                  />
                )}

                {item.src && (
                  <CustomAudioPlayer
                    src={item.src}
                    title={audioLabel || "Listen to audio"}
                  />
                )}
              </div>
            );
          }
          if (item.type === "image-audio") {
            return (
              <div key={index} className="postblock w-full text-center">
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    className="lesson-image mx-auto h-auto dark:brightness-[0.8] w-[95%] md:w-[80%]"
                  />
                )}
                {item.audio && (
                  <audio
                    controls
                    controlsList="nodownload"
                    preload="metadata"
                    className="mx-auto mb-3 2xl:w-[40%] xl:w-[50%] md:w-[60%] w-[80%] max-w-[1000px]"
                  >
                    <source src={item.audio} />
                    Your browser does not support audio.
                  </audio>
                )}
              </div>
            );
          }

          // ==========================================
          // LINKED IMAGE (Get Ans)
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
          // TEXT LINK (Linkbundle)
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
