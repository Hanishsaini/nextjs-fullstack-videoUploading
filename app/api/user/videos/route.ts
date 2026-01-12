import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return new Response("Email is required", { status: 400 });
    }

    const videos = await Video.find({ userEmail: email }).sort({ createdAt: -1 });
    return new Response(JSON.stringify(videos), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
