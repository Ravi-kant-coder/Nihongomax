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
  if (!date) return "";

  const now = Date.now();
  const diffInSeconds = Math.floor((now - new Date(date).getTime()) / 1000);

  if (diffInSeconds < 60) {
    return lang === "ja" ? dict.justNow : "Just now";
  }

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) {
    if (lang === "ja") {
      return `${minutes}${dict.minutesAgo}`;
    }
    return minutes === 1
      ? `1 ${dict.minuteAgo}`
      : `${minutes} ${dict.minutesAgo}`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    if (lang === "ja") {
      return `${hours}${dict.hoursAgo}`;
    }
    return hours === 1 ? `1 ${dict.hourAgo}` : `${hours} ${dict.hoursAgo}`;
  }

  const days = Math.floor(hours / 24);

  if (lang === "ja") {
    return `${days}${dict.daysAgo}`;
  }

  return days === 1 ? `1 ${dict.dayAgo}` : `${days} ${dict.daysAgo}`;
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
