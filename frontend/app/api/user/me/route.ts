import { forwardToBackend } from "@/lib/backend-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await forwardToBackend({
      endpoint: "/api/user/me",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Failed to fetch user:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user",
      },
      { status: 500 }
    );
  }
}