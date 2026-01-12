"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

/**
 * UploadPage Component
 * Allows users to upload videos with title, description, and category.
 * Handles file selection, preview, and progress tracking.
 */
export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const categories = ["General", "Computer Science", "Data Science", "Design", "Physics", "Engineering", "Business"];

  // Handle file select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setMessage("");
    }
  };

  // Upload to API
  const handleUpload = async () => {
    if (!file || !title) return alert("Please select a video and add a title!");

    setUploading(true);
    setProgress(0);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    try {
      const res = await axios.post("/api/videos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          if (e.total) {
            const percent = Math.round((e.loaded * 100) / e.total);
            setProgress(percent);
          }
        },
      });

      setMessage("✅ Video uploaded successfully!");
      console.log("Upload success:", res.data);
      setFile(null);
      setPreview(null);
      setTitle("");
      setDescription("");
      setCategory("General");
    } catch (err: unknown) {
      console.error("Upload failed:", err);
      if (axios.isAxiosError(err) && err.response && err.response.status === 403) {
        setMessage("❌ " + (err.response.data.error || "Upload limit reached"));
        setTimeout(() => {
          router.push("/pricing");
        }, 2000);
      } else {
        setMessage("❌ Upload failed. Try again!");
      }
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050014] via-[#0a0224] to-[#1a0133] flex flex-col items-center justify-center px-6 py-20">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-10">
        Upload Your Video
      </h1>

      <div className="bg-black/40 border border-gray-800 rounded-2xl p-8 shadow-xl w-full max-w-lg">

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">Video Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none"
            placeholder="Enter video title..."
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none h-24 resize-none"
            placeholder="What's this video about?"
          />
        </div>

        {/* Category Dropdown */}
        <div className="mb-6">
          <label className="block text-gray-400 text-sm mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none"
            aria-label="Select Category"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <label
          htmlFor="video-upload"
          className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-purple-500 rounded-lg py-10 hover:bg-purple-900/10 transition mb-6"
        >
          {preview ? (
            <video
              src={preview}
              controls
              className="rounded-lg w-full h-48 object-cover"
            />
          ) : (
            <>
              <span className="text-4xl mb-2">📤</span>
              <p className="text-gray-300">
                Drag & Drop or <span className="text-pink-400">Choose a file</span>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                MP4, MOV, or AVI up to 500MB
              </p>
            </>
          )}
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {uploading && (
          <div className="w-full bg-gray-700 rounded-full h-2 mt-6">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {message && (
          <p
            className={`mt-4 text-sm text-center ${message.includes("✅") ? "text-green-400" : "text-red-400"
              }`}
          >
            {message}
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || !title || uploading}
          className={`mt-6 w-full py-3 rounded-lg text-lg font-semibold transition-all duration-300 ${uploading || !file || !title
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg"
            }`}
        >
          {uploading ? `Uploading... ${progress}%` : "Upload Video"}
        </button>
      </div>
    </div>
  );
}
