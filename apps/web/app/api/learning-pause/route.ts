import { buildUserApiHeaders, getApiBaseUrl } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/current-user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const body = (await request.json().catch(() => ({}))) as {
    isPaused?: unknown;
  };

  if (typeof body.isPaused !== "boolean") {
    return NextResponse.json({ error: "INVALID_PAUSE_STATE" }, { status: 400 });
  }

  const response = await fetch(`${getApiBaseUrl()}/api/users/${currentUser.id}/pause`, {
    method: "POST",
    headers: buildUserApiHeaders(currentUser, {
      "content-type": "application/json",
    }),
    body: JSON.stringify({
      isPaused: body.isPaused,
    }),
  });

  const payload = await response.json().catch(() => ({}));

  return NextResponse.json(payload, { status: response.status });
}
