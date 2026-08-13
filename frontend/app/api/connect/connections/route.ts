import { forwardToBackend } from "@/lib/backend-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await forwardToBackend({
      endpoint: "/api/connect/connections",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Failed to fetch connections:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch connections",
      },
      { status: 500 }
    );
  }
}