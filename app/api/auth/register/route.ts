import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/Users";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already registered" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            email,
            password: hashedPassword,
            name: email.split("@")[0], // Default name
        });

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        );

    } catch (error) {
        console.error("Registration error", error);
        return NextResponse.json(
            { error: "Failed to register user" },
            { status: 500 }
        );
    }
}
