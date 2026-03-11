export async function getBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data = await res.json();
  return data?.data || [];
}
