import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { stripe } from "@/lib/stripe";

export async function POST() {
    try {
        if (!stripe) {
            return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
        }

        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const checkoutSession = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Vidora Pro Subscription",
                            description: "Unlimited uploads, HD quality, and more.",
                        },
                        unit_amount: 999, // $9.99
                        recurring: {
                            interval: "month",
                        },
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId: session.user.id, // Ensure user ID is passed for webhook
                email: session.user.email,
            },
            success_url: `${process.env.NEXTAUTH_URL}/profile?success=true`,
            cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
        });

        if (!checkoutSession.url) {
            return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
        }

        return NextResponse.json({ url: checkoutSession.url });
    } catch (error: unknown) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: (error as Error).message || "Internal Server Error" }, { status: 500 });
    }
}
