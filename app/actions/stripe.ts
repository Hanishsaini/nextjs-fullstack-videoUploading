"use server";

import { stripe } from "@/lib/stripe";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function createCheckoutSession(priceId: string) {
    const user = await getCurrentUser();

    if (!user || !user.email) {
        return { error: "Unauthorized" };
    }

    const origin = (await headers()).get("origin");

    const session = await stripe.checkout.sessions.create({
        customer_email: user.email,
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        mode: "subscription",
        success_url: `${origin}/dashboard?success=true`,
        cancel_url: `${origin}/pricing?canceled=true`,
        metadata: {
            userId: user.id,
        },
    });

    if (session.url) {
        redirect(session.url);
    }
}

export async function createCustomerPortal() {
    const user = await getCurrentUser();

    if (!user || !user.email) {
        return { error: "Unauthorized" };
    }

    // In a real app, you'd fetch the stripe_customer_id from your DB
    // For this example, we'll assume we can't create a portal without it
    // You would typically store stripe_customer_id in your users table
    // const dbUser = await db.query.users.findFirst({ where: eq(users.id, user.id) });
    // if (!dbUser?.stripeCustomerId) return { error: "No subscription found" };

    // Placeholder: Redirect to billing if no customer ID (implementation detail)
    // const session = await stripe.billingPortal.sessions.create({
    //   customer: dbUser.stripeCustomerId,
    //   return_url: `${origin}/dashboard`,
    // });
    // redirect(session.url);

    return { error: "Portal not implemented without DB lookup for customer ID" };
}
