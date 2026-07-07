import { forwardToBackend } from "@/lib/backend-client";
import { NextResponse } from "next/server";

export async function GET() {

  const response = await forwardToBackend({
      endpoint: "/api/connect?plugin=googlecalendar",
      redirect: "manual",
    });

  const redirectUrl = response.headers.get("location");

  if (!redirectUrl) {
    return NextResponse.json(
      { message: "No redirect URL received" },
      { status: 500 }
    );
  }

  return NextResponse.redirect(redirectUrl);
}