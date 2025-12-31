export async function fetchYouTubeVideos() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

  const url = `https://www.googleapis.com/youtube/v3/search
    ?key=${API_KEY}
    &channelId=${CHANNEL_ID}
    &part=snippet
    &order=date
    &maxResults=10`;

  const res = await fetch(url);
  const data = await res.json();

  return data.items
    .filter((item) => item.id.videoId)
    .map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
    }));
}
