import { type NextRequest } from "next/server";
import { updateSession } from "@/features/auth/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
	return await updateSession(request);
}

export const config = {
	matcher: ["/admin/:path*"],
};
