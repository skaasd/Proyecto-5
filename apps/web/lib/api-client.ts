import type { CurrentUser } from "@/lib/current-user";

export function getApiBaseUrl(): string {
  return (
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:4000"
  );
}

export function buildUserApiHeaders(currentUser: CurrentUser, headers: HeadersInit = {}): Headers {
  const nextHeaders = new Headers(headers);
  nextHeaders.set("x-current-user-id", currentUser.id);

  if (process.env.INTERNAL_API_SECRET) {
    nextHeaders.set("x-internal-api-secret", process.env.INTERNAL_API_SECRET);
  }

  return nextHeaders;
}
