
// // // "use client";

// // // import { useEffect, useState } from "react";

// // // interface Video {
// // //   _id: string;
// // //   url: string;
// // //   title?: string;
// // //   createdAt?: string;
// // // }

// // // export default function VideoList() {
// // //   const [videos, setVideos] = useState<Video[]>([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchVideos = async () => {
// // //       try {
// // //         const res = await fetch("/api/videos");
// // //         const data = await res.json();
// // //         setVideos(data.videos || []);
// // //       } catch (err) {
// // //         console.error("Failed to fetch videos:", err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchVideos();
// // //   }, []);

// // //   if (loading) {
// // //     return <p className="text-gray-300 text-center mt-12">Loading videos...</p>;
// // //   }

// // //   if (!videos.length) {
// // //     return <p className="text-gray-400 text-center mt-12">No videos uploaded yet.</p>;
// // //   }

// // //   return (
// // //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
// // //       {videos.map((video) => (
// // //         <div
// // //           key={video._id}
// // //           className="bg-black/30 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
// // //         >
// // //           <video
// // //             src={video.url}
// // //             controls
// // //             className="w-full h-48 object-cover bg-gray-900"
// // //           />
// // //           <div className="p-4">
// // //             <h2 className="text-white font-semibold text-lg truncate">{video.title || "Untitled Video"}</h2>
// // //             {video.createdAt && (
// // //               <p className="text-gray-400 text-sm mt-1">
// // //                 {new Date(video.createdAt).toLocaleDateString()}
// // //               </p>
// // //             )}
// // //           </div>
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import { useEffect, useState } from "react";

// // interface Video {
// //   _id: string;
// //   url: string;
// //   title?: string;
// //   createdAt?: string;
// // }

// // export default function VideoList() {
// //   const [videos, setVideos] = useState<Video[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchVideos = async () => {
// //       try {
// //         const res = await fetch("/api/videos");
// //         const data = await res.json();
// //         setVideos(data.videos || []);
// //       } catch (err) {
// //         console.error("Failed to fetch videos:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchVideos();
// //   }, []);

// //   if (loading) {
// //     return <p className="text-gray-300 text-center mt-12">Loading videos...</p>;
// //   }

// //   if (!videos.length) {
// //     return <p className="text-gray-400 text-center mt-12">No videos uploaded yet.</p>;
// //   }

// //   return (
// //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
// //       {videos.map((video) => (
// //         <div
// //           key={video._id}
// //           className="bg-black/30 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
// //         >
// //           <video
// //             src={video.url}
// //             controls
// //             className="w-full h-48 object-cover bg-gray-900"
// //           />
// //           <div className="p-4">
// //             <h2 className="text-white font-semibold text-lg truncate">{video.title || "Untitled Video"}</h2>
// //             {video.createdAt && (
// //               <p className="text-gray-400 text-sm mt-1">
// //                 {new Date(video.createdAt).toLocaleDateString()}
// //               </p>
// //             )}
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }
// "use client";

// import Image from "next/image";

// interface Video {
//   _id: string;
//   title: string;
//   url: string;
//   thumbnail?: string;
// }

// interface VideoListProps {
//   videos: Video[];
// }

// export default function VideoList({ videos }: VideoListProps) {
//   if (videos.length === 0) {
//     return <p className="text-gray-400 text-center mt-10">No videos uploaded yet.</p>;
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
//       {videos.map((video) => (
//         <div
//           key={video._id}
//           className="bg-black/30 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
//         >
//           <video
//             src={video.url}
//             controls
//             className="w-full h-48 object-cover"
//             poster={video.thumbnail}
//           />
//           <div className="p-4">
//             <h2 className="text-white font-semibold text-lg truncate">
//               {video.title || "Untitled"}
//             </h2>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
"use client";

export interface Video {
  _id: string;
  title: string;
  url: string;
  thumbnail?: string;
  createdAt: string;
}

interface VideoListProps {
  videos: Video[];
}

export default function VideoList({ videos }: VideoListProps) {
  if (videos.length === 0) {
    return <p className="text-gray-400 text-center mt-10">No videos uploaded yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {videos.map((video) => (
        <div
          key={video._id}
          className="bg-black/30 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
        >
          <video
            src={video.url}
            controls
            className="w-full h-48 object-cover"
            poster={video.thumbnail}
          />
          <div className="p-4">
            <h2 className="text-white font-semibold text-lg truncate">
              {video.title}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}
