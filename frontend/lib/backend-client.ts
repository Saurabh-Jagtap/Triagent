import { auth } from "@/utils/auth";
import { headers } from "next/headers";

type ForwardRequestOptions = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  redirect?: RequestRedirect
};

export async function forwardToBackend({
  endpoint,
  method = "GET",
  body,
  redirect
}: ForwardRequestOptions) {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(
    `${process.env.API_URL}${endpoint}`,
    {
      method,
      cache: "no-store",
      redirect,
      headers: {
        "Content-Type": "application/json",
        "x-user-id": session.user.id,
        "x-internal-api-key": process.env.INTERNAL_API_KEY!,
      },

      body:
        body !== undefined
          ? JSON.stringify(body)
          : undefined,
    }
  );

  return response;
}