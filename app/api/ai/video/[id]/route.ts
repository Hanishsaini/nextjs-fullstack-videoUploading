import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import AIContent from "@/models/AIContent";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();
        const video = await AIContent.findById(params.id);

        if (!video) {
            return NextResponse.json({ error: "Video not found" }, { status: 404 });
        }

        return NextResponse.json(video);
    } catch (error) {
        console.error("Fetch Video Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch video" },
            { status: 500 }
        );
    }
}
