import { forwardToBackend } from "@/lib/backend-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const query = searchParams.toString();

    const response = await forwardToBackend({
        endpoint: `/api/auth?${query}`,
        redirect: "manual",
        forwardCookies: true,
    });

    const location = response.headers.get("location");

    if (location) {
        return NextResponse.redirect(location);
    }

    const data = await response.text();

    return new NextResponse(data, {
        status: response.status,
        headers: {
            "Content-Type":
                response.headers.get("content-type") ??
                "application/json",
        },
    });
}