import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectToDatabase } from "@/lib/db";
import AIContent from "@/models/AIContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * POST /api/ai/script
 * Generates a video script from user notes using Gemini AI.
 */
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { text, style, title } = await request.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "Gemini API key not configured" },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      You are an expert educational video director.
      Convert the following notes into a ${style} video script.
      Output ONLY a JSON array of scenes. Do not include markdown formatting.
      
      Each scene object must have:
      - "text": The narration (what the voiceover says). Keep it conversational.
      - "visual": A short description of what to show on screen (e.g., "Diagram of an atom", "Text: E=mc^2").
      - "duration": Estimated duration in seconds (number).

      Notes:
      ${text}
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let scriptText = response.text();

        // Clean up markdown code blocks if present
        scriptText = scriptText.replace(/```json/g, "").replace(/```/g, "").trim();

        const script = JSON.parse(scriptText);

        await connectToDatabase();
        const newContent = await AIContent.create({
            userId: session.user.id,
            title,
            originalText: text,
            style,
            script,
        });

        return NextResponse.json({ id: newContent._id });
    } catch (error) {
        console.error("Script Generation Error:", error);
        return NextResponse.json(
            { error: "Failed to generate script" },
            { status: 500 }
        );
    }
}
