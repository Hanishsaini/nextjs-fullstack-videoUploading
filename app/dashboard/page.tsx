"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Video } from "../components/VideoList";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/videos/user/${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setVideos(data);
          setLoading(false);
        });
    }
  }, [session]);

  if (status === "loading" || loading)
    return <p className="text-center mt-20 text-gray-400">Loading...</p>;

  if (!session)
    return <p className="text-center mt-20 text-gray-400">Please log in to view your uploads.</p>;

  return (
    <div className="min-h-screen bg-black text-white py-16 px-8">
      <h1 className="text-4xl font-bold text-center mb-10">My Uploads</h1>

      {videos.length === 0 ? (
        <p className="text-center text-gray-400">You haven’t uploaded any videos yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div key={video._id} className="bg-gray-900 rounded-lg p-4 shadow-lg">
              <video src={video.url} controls className="w-full rounded-lg" />
              <p className="mt-3 text-center font-semibold">{video.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
