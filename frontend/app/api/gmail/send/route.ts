import { NextResponse } from "next/server";
import { forwardToBackend } from "@/lib/backend-client";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await forwardToBackend({
      endpoint: "/api/gmail/send",
      method: "POST",
      body,
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
}