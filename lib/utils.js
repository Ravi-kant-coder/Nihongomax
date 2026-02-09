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
