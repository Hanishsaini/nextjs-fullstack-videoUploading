import { connectToDatabase } from "@/lib/db";

export async function GET() {
  const db = await connectToDatabase();
  console.log("Connected to MongoDB:", db.connection.name);
  return new Response("✅ MongoDB connected successfully");
}
