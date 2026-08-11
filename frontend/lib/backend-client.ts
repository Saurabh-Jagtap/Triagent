import { auth } from "@/utils/auth";
import { headers } from "next/headers";

type ForwardRequestOptions = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  redirect?: RequestRedirect;
  forwardCookies?: boolean;
};

export async function forwardToBackend({
  endpoint,
  method = "GET",
  body,
  redirect,
  forwardCookies = false,
}: ForwardRequestOptions) {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    "x-user-id": session.session.userId,
    "x-internal-api-key": process.env.INTERNAL_API_KEY!,
  };

  if (forwardCookies) {
    const incomingHeaders = await headers();
    const cookie = incomingHeaders.get("cookie");

    if (cookie) {
      requestHeaders["cookie"] = cookie;
    }
  }

  const response = await fetch(
    `${process.env.API_URL}${endpoint}`,
    {
      method,
      cache: "no-store",
      redirect,
      headers: requestHeaders,
      body:
        body !== undefined
          ? JSON.stringify(body)
          : undefined,
    }
  );

  return response;
}