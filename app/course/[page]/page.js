import CoursePageClient from "./CoursePageClient";

export async function generateMetadata({ params }) {
  const { page: pageName } = await params;

  const title = getPageTitle(pageName);

  return {
    title,
  };
}

function getPageTitle(pageName) {
  if (!pageName) {
    return "Nihongomax";
  }

  const value = pageName.toLowerCase();

  // =========================
  // JLPT
  // =========================

  const jlptClassMatch = value.match(/^n([1-5])class(\d+)$/);

  if (jlptClassMatch) {
    const level = jlptClassMatch[1];
    const classNumber = jlptClassMatch[2];

    return `JLPT N${level} Class ${classNumber} | Nihongomax`;
  }

  const jlptListMatch = value.match(/^classn([1-5])$/);

  if (jlptListMatch) {
    const level = jlptListMatch[1];

    return `JLPT N${level} Japanese Course | Nihongomax`;
  }

  // =========================
  // BUSINESS JAPANESE
  // =========================

  const businessJapaneseMatch = value.match(/^bjclass(\d+)$/);

  if (businessJapaneseMatch) {
    const classNumber = businessJapaneseMatch[1];

    return `Business Japanese Class ${classNumber} | Nihongomax`;
  }

  // =========================
  // BUSINESS ENGLISH
  // =========================

  const businessEnglishMatch = value.match(/^business-english-(.+)-classes$/);

  if (businessEnglishMatch) {
    const type = businessEnglishMatch[1]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());

    return `Business English ${type} Classes | Nihongomax`;
  }

  // =========================
  // KAIWA
  // =========================

  if (value === "kaiwa-classes") {
    return "Kaiwa Japanese Conversation Classes | Nihongomax";
  }

  // =========================
  // EIKAIWA
  // =========================

  if (value === "eikaiwa-classes") {
    return "Eikaiwa English Conversation Classes | Nihongomax";
  }

  // =========================
  // BUSINESS JAPANESE COURSE LISTS
  // =========================

  const businessJapaneseLists = {
    bjfunda: "Business Japanese Fundamentals | Nihongomax",
    bjbasic: "Business Japanese Basic Course | Nihongomax",
    bjbasicint: "Business Japanese Basic Intermediate Course | Nihongomax",
    bjint: "Business Japanese Intermediate Course | Nihongomax",
    bjintadv: "Business Japanese Intermediate Advanced Course | Nihongomax",
    bjadv: "Business Japanese Advanced Course | Nihongomax",
    bjadvsup: "Business Japanese Super Advanced Course | Nihongomax",
  };

  if (businessJapaneseLists[value]) {
    return businessJapaneseLists[value];
  }

  // =========================
  // FALLBACK
  // =========================

  return `${pageName} | Nihongomax`;
}

export default function CoursePage({ params }) {
  return <CoursePageClient params={params} />;
}
