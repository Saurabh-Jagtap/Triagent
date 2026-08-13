import { forwardToBackend } from "@/lib/backend-client";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await forwardToBackend({
    endpoint: "/api/connect?plugin=googlecalendar",
    redirect: "manual",
  });

  const redirectUrl = response.headers.get("location");
  const setCookie = response.headers.get("set-cookie");

  if (!redirectUrl) {
    return NextResponse.json(
      { message: "No redirect URL received" },
      { status: 500 }
    );
  }

  const nextResponse = NextResponse.redirect(redirectUrl);

  if (setCookie) {
    nextResponse.headers.set("set-cookie", setCookie);
  }

  return nextResponse;
}