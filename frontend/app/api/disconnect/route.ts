import { NextRequest, NextResponse } from "next/server";
import { forwardToBackend } from "@/lib/backend-client";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const plugin = searchParams.get("plugin");

  if (!plugin) {
    return NextResponse.json(
      {
        success: false,
        message: "Plugin is required.",
      },
      {
        status: 400,
      }
    );
  }

  const response = await forwardToBackend({
    endpoint: `/api/integration/disconnect?plugin=${plugin}`,
    method: "POST",
  });

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}