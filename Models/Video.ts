
// import mongoose, { Schema, model, models, Document } from "mongoose";

// export const VIDEO_DIMENSIONS = {
//   width: 1080,
//   height: 1920,
// } as const;

// export interface IVideo extends Document {
//   _id: mongoose.Types.ObjectId;
//   title: string;
//   description: string;
//   videoUrl: string;
//   thumbnailUrl: string;
//   controls?: boolean;
//   transformation?: {
//     height: number;
//     width: number;
//     quality?: number;
//   };
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// const VideoSchema = new Schema<IVideo>(
//   {
//     title: { type: String, required: true, trim: true },
//     description: { type: String, required: true, trim: true },
//     videoUrl: { type: String, required: true },
//     thumbnailUrl: { type: String, required: true },
//     controls: { type: Boolean, default: true },
//     transformation: {
//       height: { type: Number, default: VIDEO_DIMENSIONS.height },
//       width: { type: Number, default: VIDEO_DIMENSIONS.width },
//       quality: { type: Number, min: 1, max: 100 },
//     },
//   },
//   { timestamps: true }
// );

// // Prevent model overwrite on hot reload in Next.js
// const Video = models.Video || model<IVideo>("Video", VideoSchema);

// export default Video;
import mongoose, { Schema, model, models, Document } from "mongoose";

export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920,
} as const;

export interface IVideo extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
  uploadedBy: string; // 👈 NEW FIELD (links to uploader’s user ID)
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const VideoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    controls: { type: Boolean, default: true },
    transformation: {
      height: { type: Number, default: VIDEO_DIMENSIONS.height },
      width: { type: Number, default: VIDEO_DIMENSIONS.width },
      quality: { type: Number, min: 1, max: 100 },
    },
    uploadedBy: { type: String, required: true }, // 👈 NEW FIELD
    category: { type: String, required: true, default: "General" }, // 👈 NEW FIELD
  },
  { timestamps: true }
);

// Prevent model overwrite on hot reload in Next.js
const Video = models.Video || model<IVideo>("Video", VideoSchema);

export default Video;

