import { buildUserApiHeaders, getApiBaseUrl } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/current-user";

export async function GET() {
  const currentUser = await getCurrentUser();
  const response = await fetch(`${getApiBaseUrl()}/api/users/${currentUser.id}/export`, {
    cache: "no-store",
    headers: buildUserApiHeaders(currentUser),
  });

  if (!response.ok) {
    return Response.json(
      {
        error: "EXPORT_FAILED",
        message: "No pudimos preparar la exportacion todavia.",
      },
      {
        status: response.status,
      },
    );
  }

  return new Response(await response.text(), {
    headers: {
      "content-disposition": `attachment; filename="${currentUser.id}-learning-export.json"`,
      "content-type": "application/json; charset=utf-8",
    },
  });
}
