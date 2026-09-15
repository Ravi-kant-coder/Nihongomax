export function coursePageUrl(legacyHref) {
  if (!legacyHref) return "#";

  let value = String(legacyHref).trim();

  // Remove leading ./ or /
  value = value.replace(/^\.?\//, "");

  // Convert old website PHP URLs to the new Next.js course route
  const legacyDomain =
    /^https?:\/\/(?:www\.)?onlinejapaneseclasses\.com\/(.+)$/i;

  const legacyMatch = value.match(legacyDomain);

  if (legacyMatch) {
    const path = legacyMatch[1];

    const phpMatch = path.match(/^([^?#]+)\.php(.*)$/i);

    if (phpMatch) {
      const filename = phpMatch[1];
      const suffix = phpMatch[2] || "";

      return `/course/${filename}${suffix}`;
    }
  }

  // Convert relative PHP links
  if (/\.php(?:[?#].*)?$/i.test(value)) {
    const match = value.match(/^([^?#]+)\.php(.*)$/i);

    if (match) {
      const filename = match[1];
      const suffix = match[2] || "";

      return `/course/${filename}${suffix}`;
    }
  }

  // Genuine external URL
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return value;
}
