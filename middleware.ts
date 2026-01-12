import { type NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/env";

export async function middleware(request: NextRequest) {
  // If Supabase is not configured, skip Supabase-based auth checks
  // This allows the app to run with NextAuth only
  if (!isSupabaseConfigured()) {
    return NextResponse.next();
  }

  // Only import Supabase modules if configured
  const { updateSession } = await import("@/lib/supabase/middleware");
  const { createServerClient } = await import("@supabase/ssr");
  const { env } = await import("@/lib/env");

  // 1. Update session (refresh tokens if needed)
  const response = await updateSession(request);

  // 2. Create Supabase client for checks
  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response.cookies.setAll(cookiesToSet);
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 3. Protected Routes (Login Required)
  const protectedPaths = ["/dashboard", "/settings", "/upload", "/profile", "/premium"];
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !user) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("error", "Please log in to access this page");
    return NextResponse.redirect(redirectUrl);
  }

  // 4. Premium Routes (Subscription Required)
  if (request.nextUrl.pathname.startsWith("/premium") && user) {
    const { data: dbUser } = await supabase
      .from("users")
      .select("is_pro")
      .eq("id", user.id)
      .single();

    if (!dbUser?.is_pro) {
      const redirectUrl = new URL("/pricing", request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
