import { buildUserApiHeaders, getApiBaseUrl } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/current-user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const body = (await request.json()) as {
    questionId?: unknown;
    answerId?: unknown;
    responseTimeMs?: unknown;
  };

  if (typeof body.questionId !== "string" || typeof body.answerId !== "string") {
    return NextResponse.json({ error: "INVALID_MISSION_RESPONSE" }, { status: 400 });
  }

  const response = await fetch(`${getApiBaseUrl()}/api/responses`, {
    method: "POST",
    headers: buildUserApiHeaders(currentUser, {
      "content-type": "application/json",
    }),
    body: JSON.stringify({
      userId: currentUser.id,
      questionId: body.questionId,
      answerId: body.answerId,
      responseTimeMs:
        typeof body.responseTimeMs === "number" && Number.isFinite(body.responseTimeMs)
          ? Math.max(0, Math.round(body.responseTimeMs))
          : 0,
      attemptNumber: 1,
      channel: "web",
    }),
  });

  const payload = await response.json().catch(() => ({}));

  return NextResponse.json(payload, { status: response.status });
}
