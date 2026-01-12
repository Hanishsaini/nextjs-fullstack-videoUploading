import { getCurrentUser } from "./auth";
import { createClient } from "@/lib/supabase/server";

export async function checkSubscription() {
    const user = await getCurrentUser();

    if (!user) {
        return false;
    }

    const supabase = await createClient();
    const { data: dbUser } = await supabase
        .from("users")
        .select("is_pro")
        .eq("id", user.id)
        .single();

    return !!dbUser?.is_pro;
}
