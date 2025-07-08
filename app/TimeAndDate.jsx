"use client";
const formatTime = (createdAt) => {
  if (!createdAt) return "";

  const date =
    typeof createdAt === "string" && /^\d{4}-\d{2}-\d{2}$/.test(createdAt)
      ? new Date(createdAt)
      : new Date(createdAt);

  if (isNaN(date.getTime())) return "";

  const now = new Date();
  const diffMs = now - date;

  if (diffMs < 0) return "";

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (hours < 18 && days === 0) {
    if (hours > 0) return hours === 1 ? "an hour ago" : `${hours} hours ago`;
    if (minutes > 0)
      return minutes === 1 ? "a minute ago" : `${minutes} minutes ago`;
    return seconds < 10 ? "Just now" : `${seconds} seconds ago`;
  } else if (days === 0) {
    return "Today";
  } else if (days === 1) {
    return "Yesterday";
  } else if (days === 2) {
    return "Day before yesterday";
  } else {
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
};

const buildFullTimestamp = (date, time) => {
  if (!date && !time) return null;
  if (date && time) return `${date}T${time}:00+05:30`;
  if (date) return `${date}T00:00:00+05:30`;
  return null;
};

const TimeAndDate = ({ datePosted, timePosted, timestamp }) => {
  const fullTime = buildFullTimestamp(datePosted, timePosted);
  return <span>{formatTime(fullTime)}</span>;
};

export default TimeAndDate;
