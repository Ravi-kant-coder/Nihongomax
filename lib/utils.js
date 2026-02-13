import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, parseISO } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date) => {
  return formatDistanceToNow(parseISO(date), { addSuffix: true });
};

export const formatDateInDDMMYYY = (date) => {
  return new Date(date).toLocaleDateString("en-GB");
};

export const formatRelativeTime = (date, lang = "en", dict) => {
  const now = Date.now();
  const diff = Math.floor((now - new Date(date).getTime()) / 1000);

  if (diff < 60) {
    return lang === "ja" ? dict.justNow : "just now";
  }

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) {
    return lang === "ja"
      ? `${minutes}${dict.minutesAgo}`
      : `${minutes} ${dict.minutesAgo}`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return lang === "ja"
      ? `${hours}${dict.hoursAgo}`
      : `${hours} ${dict.hoursAgo}`;
  }

  const days = Math.floor(hours / 24);
  return lang === "ja" ? `${days}${dict.daysAgo}` : `${days} ${dict.daysAgo}`;
};

export const formatJapaneseDate = (date = new Date()) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${year}年${month}月${day}日`;
};

export const wrapEmojis = (text) => {
  if (!text) return text;

  return text.split(/(\p{Extended_Pictographic})/gu).map((part, i) =>
    /\p{Extended_Pictographic}/gu.test(part) ? (
      <span key={i} className="emoji-span">
        {part}
      </span>
    ) : (
      part
    ),
  );
};
