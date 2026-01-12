import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class APIError extends Error {
    constructor(
        public message: string,
        public statusCode: number = 500,
        public code?: string
    ) {
        super(message);
        this.name = "APIError";
    }
}

export function handleError(error: unknown) {
    console.error("API Error:", error);

    if (error instanceof APIError) {
        return NextResponse.json(
            { error: error.message, code: error.code },
            { status: error.statusCode }
        );
    }

    if (error instanceof ZodError) {
        return NextResponse.json(
            { error: "Validation Error", details: error.errors },
            { status: 400 }
        );
    }

    return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
    );
}

export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, options);

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new APIError(
            errorData.error || "An error occurred while fetching data",
            res.status
        );
    }

    return res.json();
}
