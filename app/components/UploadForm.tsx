
// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import Image from "next/image";

// // export default function UploadForm() {
// //   const router = useRouter();
// //   const [file, setFile] = useState<File | null>(null);
// //   const [preview, setPreview] = useState<string | null>(null);
// //   const [uploading, setUploading] = useState(false);

// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const selectedFile = e.target.files?.[0];
// //     if (selectedFile) {
// //       setFile(selectedFile);
// //       setPreview(URL.createObjectURL(selectedFile));
// //     }
// //   };

// //   const handleUpload = async () => {
// //     if (!file) return;
// //     setUploading(true);

// //     const formData = new FormData();
// //     formData.append("file", file);
// //     formData.append("folder", "user_uploads");

// //     // Will call /api/upload route
// //     const res = await fetch("/api/upload", {
// //       method: "POST",
// //       body: formData,
// //     });

// //     const data = await res.json();
// //     setUploading(false);

// //     if (data.url) {
// //       alert("Upload successful! 🎉");
// //       router.push("/gallery");
// //     } else {
// //       alert("Upload failed. Try again.");
// //     }
// //   };

// //   return (
// //     <div className="w-full max-w-2xl flex flex-col gap-6 mx-auto">
// //       {/* Drag & Drop */}
// //       <div className="border-2 border-dashed border-white/30 rounded-2xl h-64 flex items-center justify-center flex-col text-center p-6 hover:border-pink-400 transition-colors duration-300 cursor-pointer relative">
// //         <Image
// //           src="/upload.svg"
// //           alt="Upload Icon"
// //           width={80}
// //           height={80}
// //           className="mb-4 dark:invert"
// //         />
// //         <p className="text-gray-300 mb-2">Drag & drop your video here</p>
// //         <p className="text-gray-400 text-sm">or click to select from your device</p>
// //         <input
// //           type="file"
// //           accept="video/*"
// //           onChange={handleFileChange}
// //           className="absolute w-full h-full opacity-0 cursor-pointer"
// //         />
// //       </div>

// //       {/* Preview */}
// //       {preview && (
// //         <div className="bg-black/20 p-4 rounded-xl">
// //           <video
// //             src={preview}
// //             controls
// //             className="w-full rounded-lg shadow-lg"
// //           />
// //         </div>
// //       )}

// //       {/* Upload Button */}
// //       <button
// //         onClick={handleUpload}
// //         disabled={!file || uploading}
// //         className={`bg-pink-500 hover:bg-pink-400 transition-all duration-300 py-3 rounded-lg font-bold text-black shadow-lg ${
// //           !file ? "opacity-50 cursor-not-allowed" : ""
// //         }`}
// //       >
// //         {uploading ? "Uploading..." : "Upload Video"}
// //       </button>
// //     </div>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import Image from "next/image";

// export default function UploadForm() {
//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setPreview(URL.createObjectURL(selectedFile));
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return alert("Please select a video first!");

//     setUploading(true);

//     try {
//       // Step 1: Upload to ImageKit (or your upload API)
//       const formData = new FormData();
//       formData.append("file", file);

//       const uploadRes = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const uploadData = await uploadRes.json();
//       if (!uploadData.url) throw new Error("Upload failed");

//       // Step 2: Save metadata to MongoDB
//       const videoData = {
//         title: title || file.name,
//         description,
//         url: uploadData.url,
//       };

//       const saveRes = await fetch("/api/videos", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(videoData),
//       });

//       if (saveRes.ok) {
//         alert("🎉 Video uploaded and saved successfully!");
//         setFile(null);
//         setPreview(null);
//         setTitle("");
//         setDescription("");
//       } else {
//         throw new Error("Failed to save video details to database");
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       alert("Upload failed, please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
//       <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-violet-500 text-transparent bg-clip-text mb-6">
//         Upload a New Video
//       </h1>

//       <input
//         type="text"
//         placeholder="Enter video title..."
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-full bg-black/20 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none"
//       />

//       <textarea
//         placeholder="Enter description..."
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         className="w-full bg-black/20 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none"
//       />

//       <div className="border-2 border-dashed border-gray-500 rounded-xl h-64 w-full flex flex-col items-center justify-center p-4 hover:border-pink-500 transition">
//         <Image
//           src="/upload.svg"
//           alt="Upload Icon"
//           width={60}
//           height={60}
//           className="mb-4 opacity-80"
//         />
//         <p className="text-gray-300 mb-1">Drag & drop or click to upload</p>
//         <input
//           type="file"
//           accept="video/*"
//           onChange={handleFileChange}
//           className="absolute w-full h-full opacity-0 cursor-pointer"
//         />
//       </div>

//       {preview && (
//         <video src={preview} controls className="w-full rounded-lg shadow-lg" />
//       )}

//       <button
//         onClick={handleUpload}
//         disabled={uploading || !file}
//         className={`w-full bg-gradient-to-r from-pink-500 to-violet-500 text-black font-bold py-3 rounded-lg shadow-lg transition-all duration-300 ${
//           !file ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]"
//         }`}
//       >
//         {uploading ? "Uploading..." : "Upload Video"}
//       </button>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UploadForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Redirect if not logged in
  if (!session) {
    router.push("/login");
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "user_uploads");

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploading(false);

    if (data.url) {
      alert("Upload successful! 🎉");
      router.push("/gallery");
    } else {
      alert("Upload failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-24 px-6 bg-gradient-to-br from-[#0b0c10] via-[#1c1c1c] to-[#161616] gap-12">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-purple-700 to-indigo-800 text-center mb-6">
        Upload Your DarkVision Video
      </h1>

      {/* Drag & Drop Section */}
      <div
        className="relative w-full max-w-2xl h-64 border-2 border-dashed border-gray-600 rounded-2xl flex flex-col items-center justify-center text-center p-6 cursor-pointer transition-all duration-300 hover:border-purple-500 hover:shadow-lg"
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <Image
          src="/upload.svg"
          alt="Upload Icon"
          width={80}
          height={80}
          className="mb-4 invert dark:invert-0"
        />
        <p className="text-gray-300 mb-2">Drag & drop your video here</p>
        <p className="text-gray-400 text-sm">or click to select from your device</p>
        <input
          type="file"
          id="fileInput"
          accept="video/*"
          onChange={handleFileChange}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Preview */}
      {preview && (
        <div className="w-full max-w-2xl bg-black/20 p-4 rounded-xl shadow-lg flex flex-col items-center">
          <video
            src={preview}
            controls
            className="w-full h-[300px] object-cover rounded-lg shadow-xl mb-4"
          />
          <p className="text-gray-300 text-sm">Preview your video before upload</p>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className={`bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ${
          !file ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {uploading ? "Uploading..." : "Upload Video"}
      </button>
    </div>
  );
}
