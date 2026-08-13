import { forwardToBackend } from "@/lib/backend-client";
import { NextResponse } from "next/server";

export async function DELETE() {
    try {
        const response = await forwardToBackend({
            endpoint: "/api/user/account",
            method: "DELETE",
        });

        const data = await response.json();

        return NextResponse.json(data, {
            status: response.status,
        });
    } catch (error) {
        console.error(
            "Failed to delete account:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete account",
            },
            { status: 500 }
        );
    }
}