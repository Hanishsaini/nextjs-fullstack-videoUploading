"use client";
import { useEffect, useState } from "react";
import VideoList, { Video } from "../components/VideoList";

import { useSearchParams } from "next/navigation";

export default function FeedPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const url = category ? `/api/videos?category=${encodeURIComponent(category)}` : "/api/videos";
        const res = await fetch(url);
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error("Error loading videos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [category]);

  if (loading) return <div className="text-center text-gray-500 mt-20">Loading feed...</div>;

  return (
    <main className="min-h-screen bg-[#050505] text-white px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 tracking-wide capitalize">
        {category ? `${category} Videos` : "⚔️ Battle Feed"}
      </h1>
      {videos.length > 0 ? (
        <VideoList videos={videos} />
      ) : (
        <div className="text-center mt-20">
          <p className="text-xl text-gray-400 mb-4">No videos found in this category.</p>
          <p className="text-gray-500">Be the first to upload one!</p>
        </div>
      )}
    </main>
  );
}
