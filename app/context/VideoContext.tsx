"use client";

import React, { createContext, useState, useContext } from "react";

type Video = {
  url: string;
  name: string;
};

type VideoContextType = {
  videos: Video[];
  addVideo: (video: Video) => void;
};

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: React.ReactNode }) => {
  const [videos, setVideos] = useState<Video[]>([]);

  const addVideo = (video: Video) => {
    setVideos((prev) => [video, ...prev]);
  };

  return (
    <VideoContext.Provider value={{ videos, addVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideos = (): VideoContextType => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideos must be used within a VideoProvider");
  }
  return context;
};
