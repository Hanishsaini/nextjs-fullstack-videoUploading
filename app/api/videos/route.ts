import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FilterQuery } from "mongoose";

// ✅ Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryResponse {
    secure_url: string;
}

/**
 * GET /api/videos
 * Fetches all videos with optional category filter.
 */
export async function GET(req: Request) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");

        const query: FilterQuery<IVideo> = {};
        if (category && category.toLowerCase() !== "all") {
            // Case-insensitive search for category
            query.category = { $regex: new RegExp(`^${category}$`, "i") };
        }

        const videos = await Video.find(query).sort({ createdAt: -1 }).limit(20).lean<IVideo[]>();

        return NextResponse.json(
            videos.map((v) => ({
                _id: v._id.toString(),
                title: v.title || "Untitled",
                description: v.description,
                url: v.videoUrl,
                thumbnail: v.thumbnailUrl,
                category: v.category,
                uploadedBy: v.uploadedBy,
            }))
        );
    } catch (error: unknown) {
        console.error("Error fetching videos:", error);
        return NextResponse.json(
            { error: "Failed to fetch videos", details: (error as Error).message },
            { status: 500 }
        );
    }
}

/**
 * POST /api/videos
 * Uploads a new video to Cloudinary and saves metadata to DB.
 */
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        // Check upload limits for free users
        if (!session.user.isPro) {
            const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const recentUploads = await Video.countDocuments({
                uploadedBy: session.user.id,
                createdAt: { $gte: oneDayAgo },
            });

            if (recentUploads >= 1) {
                return NextResponse.json(
                    { error: "Daily upload limit reached. Upgrade to Pro for unlimited uploads." },
                    { status: 403 }
                );
            }
        }

        const formData = await req.formData();
        const file = formData.get("file") as Blob | null;
        const title = (formData.get("title") as string) || "Untitled Upload";
        const description = (formData.get("description") as string) || "Uploaded from client";
        const category = (formData.get("category") as string) || "General";

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Mock upload if Cloudinary keys are missing
        let videoUrl = "https://res.cloudinary.com/demo/video/upload/v1687516629/samples/elephants.mp4";
        let thumbnailUrl = "https://res.cloudinary.com/demo/video/upload/v1687516629/samples/elephants.jpg";

        if (process.env.CLOUDINARY_CLOUD_NAME) {
            // Convert Blob → Buffer
            const buffer = Buffer.from(await file.arrayBuffer());

            // Upload to Cloudinary
            const uploadRes = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "vidora_uploads", resource_type: "video" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(buffer);
            });

            const videoResult = uploadRes as CloudinaryResponse;
            videoUrl = videoResult.secure_url;
            thumbnailUrl = videoResult.secure_url.replace(".mp4", ".jpg");
        }

        const newVideo = await Video.create({
            title,
            description,
            videoUrl,
            thumbnailUrl,
            category,
            uploadedBy: session.user.id,
        });

        return NextResponse.json(
            { message: "✅ Video uploaded successfully!", video: newVideo },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error("Error uploading video:", error);
        return NextResponse.json(
            { error: "Upload failed", details: (error as Error).message },
            { status: 500 }
        );
    }
}
