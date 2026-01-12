import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

// Admin client to bypass RLS for webhook updates
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * POST /api/webhooks/stripe
 * Handles Stripe webhook events for subscription management.
 */
export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        if (!session?.metadata?.userId) {
            return new NextResponse("User id is required", { status: 400 });
        }

        await supabaseAdmin
            .from("users")
            .update({
                stripe_customer_id: session.customer as string,
                is_pro: true,
            })
            .eq("id", session.metadata.userId);

        await supabaseAdmin.from("payments").insert({
            user_id: session.metadata.userId,
            stripe_session_id: session.id,
            amount: session.amount_total,
            currency: session.currency,
            status: session.payment_status,
        });
    }

    if (event.type === "customer.subscription.deleted") {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Find user by customer ID
        const { data: user } = await supabaseAdmin
            .from("users")
            .select("id")
            .eq("stripe_customer_id", customerId)
            .single();

        if (user) {
            await supabaseAdmin
                .from("users")
                .update({ is_pro: false })
                .eq("id", user.id);
        }
    }

    return new NextResponse(null, { status: 200 });
}
