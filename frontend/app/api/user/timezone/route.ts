import { forwardToBackend } from "@/lib/backend-client";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
    const body = await request.json();

    const response = await forwardToBackend({
        endpoint: "/api/user/timezone",
        method: "PATCH",
        body,
    });

    const data = await response.json();

    return NextResponse.json(data, {
        status: response.status,
    });
}