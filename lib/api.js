const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function getLesson(level, classNumber) {
  const response = await fetch(
    `${API_BASE}/api/lessons/${level}/${classNumber}`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  const data = await response.json();

  return {
    response,
    data,
  };
}
