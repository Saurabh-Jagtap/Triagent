import { forwardToBackend } from "@/lib/backend-client";
import { NextResponse } from "next/server";

type Params = {
  params: Promise<{
    provider: string;
  }>;
};

export async function DELETE(
  _request: Request,
  { params }: Params
) {
  try {
    const { provider } = await params;

    const response = await forwardToBackend({
      endpoint: `/api/connect/connections/${provider}`,
      method: "DELETE",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Failed to disconnect account:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to disconnect account",
      },
      { status: 500 }
    );
  }
}