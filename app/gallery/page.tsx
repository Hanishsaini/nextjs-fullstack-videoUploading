
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Video {
  _id: string;
  title: string;
  url: string;
  thumbnail: string;
}

export default function GalleryPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("/api/videos");
        setVideos(res.data);
      } catch (error) {
        console.error("❌ Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        Loading videos...
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-gray-400">
        <p>No videos uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="pt-20 px-6 sm:px-10 bg-black min-h-screen">
      <h1 className="text-3xl font-bold text-pink-500 mb-6 text-center">
        🎬 Explore Videos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div
            key={video._id}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transform transition-all duration-300 cursor-pointer"
          >
            <video
              src={video.url}
              poster={video.thumbnail}
              controls
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-white">{video.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
