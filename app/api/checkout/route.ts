import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    apiVersion: "2025-11-17.clover",
    typescript: true,
});

const CheckoutSchema = z.object({
    planId: z.string(),
    userId: z.string(),
});

export async function createStripeSession(planId: string, userId: string) {
    const isSubscription = planId.startsWith("sub_");

    const session = await stripe.checkout.sessions.create({
        mode: isSubscription ? "subscription" : "payment",
        payment_method_types: ["card"],
        line_items: [
            {
                price: planId,
                quantity: 1,
            },
        ],
        metadata: {
            userId,
        },
        success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/cancel`,
    });

    return session;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { planId, userId } = CheckoutSchema.parse(body);

        const session = await createStripeSession(planId, userId);

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
