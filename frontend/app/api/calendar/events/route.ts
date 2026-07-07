import { forwardToBackend } from "@/lib/backend-client";
import { NextResponse } from "next/server";

export async function GET() {

  const response = await forwardToBackend({
    endpoint: "/api/calendar/events",
  });

  const data = await response.json();

  return NextResponse.json(data);
}
