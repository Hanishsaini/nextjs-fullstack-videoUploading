const { NextRequest, NextResponse } = require("next/server");
import  { connectToDatabase }  from "@/lib/db";
import User from "@/models/User";
import { error } from "console";

export async function POST(request){
    try {
        const {email, password} = await request.json()

        if(!email || !password){
            return NextResponse.json(
                {error: "Email and password are required"},
                {status: 400}
            )
        }

        const existingUser = await User.FindOne({email})
        if(existingUser){
            return NextResponse.json(
                {error: "User already registered"},
                {status:400}
            );
        }


        await User.create({
            email,
            password
        })

        return NextResponse.json(
            {message:"user registered sucessfully"},
            {status:400}
        );

    } catch (error) {
        console.error("Registration error", error)
        return NextResponse.json(
            {error: "Failed to register user"},
            {status: 400}
        );
    }
}

