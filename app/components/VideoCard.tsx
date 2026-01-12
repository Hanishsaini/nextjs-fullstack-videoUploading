"use client";

import { motion } from "framer-motion";
import { Play, Clock } from "lucide-react";
import Link from "next/link";
import { Video } from "./VideoList";

interface VideoCardProps {
    video: Video;
    index: number;
}

export default function VideoCard({ video, index }: VideoCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
        >
            <Link href={`/video/${video._id}`}>
                <div className="relative aspect-video rounded-xl overflow-hidden glass border-0 group-hover:shadow-[0_0_30px_rgba(112,66,248,0.3)] transition-all duration-500">
                    <video
                        src={video.url}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        poster={video.thumbnail}
                        muted
                        loop
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => {
                            e.currentTarget.pause();
                            e.currentTarget.currentTime = 0;
                        }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-white font-bold text-lg truncate">{video.title}</h3>
                            <div className="flex items-center gap-2 text-gray-300 text-sm mt-1">
                                <Clock className="w-3 h-3" />
                                <span>2 mins ago</span>
                            </div>
                        </div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
                            <Play className="w-5 h-5 text-white fill-current" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
