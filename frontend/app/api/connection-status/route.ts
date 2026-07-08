import { NextResponse } from "next/server";
import { forwardToBackend } from "@/lib/backend-client";

export async function GET() {
  const response = await forwardToBackend({
    endpoint: "/api/integration/status",
  });

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}