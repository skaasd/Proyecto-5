import { auth } from "@/auth";
import { redirect } from "next/navigation";

export type CurrentUser = {
  id: string;
  email: string | null;
  name: string | null;
  isDemo: boolean;
};

type SessionUserWithId = {
  id?: string;
  email?: string | null;
  name?: string | null;
};

export async function getCurrentUser(): Promise<CurrentUser> {
  const session = await auth();
  const sessionUser = session?.user as SessionUserWithId | undefined;

  if (sessionUser?.id) {
    return {
      id: sessionUser.id,
      email: sessionUser.email ?? null,
      name: sessionUser.name ?? null,
      isDemo: false,
    };
  }

  const demoUserId =
    process.env.DEMO_USER_ID ?? (process.env.NODE_ENV !== "production" ? "user_demo" : undefined);

  if (demoUserId) {
    return {
      id: demoUserId,
      email: "demo@example.com",
      name: "Demo QA",
      isDemo: true,
    };
  }

  redirect("/login");
}
