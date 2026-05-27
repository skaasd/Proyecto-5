import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/current-user";
import { ArrowLeft, Download, Gauge, Mail, UserCircle } from "lucide-react";
import Link from "next/link";

type UserProfileResponse = {
  profile: {
    id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    preferences: {
      questionsPerWeek: number;
      tipsPerWeek: number;
      isPaused: boolean;
      pausedUntil?: string;
    };
  };
};

async function getUserProfile(userId: string): Promise<UserProfileResponse | null> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:4000";

  try {
    const response = await fetch(`${apiBaseUrl}/api/users/${userId}/profile`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as UserProfileResponse;
  } catch {
    return null;
  }
}

function getExportUrl(userId: string) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:4000";
  return `${apiBaseUrl}/api/users/${userId}/export`;
}

function formatDate(value?: string) {
  if (!value) {
    return "Sin fecha";
  }

  return new Date(value).toLocaleString("es-CL", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function ProfilePage() {
  const currentUser = await getCurrentUser();
  const response = await getUserProfile(currentUser.id);
  const profile = response?.profile;
  const exportUrl = getExportUrl(currentUser.id);

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-8">
      <header className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-accent">Perfil</p>
          <h1 className="mt-2 text-3xl font-semibold">Cuenta y preferencias</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard">
              <ArrowLeft size={18} aria-hidden="true" />
              Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline">
            <a href={exportUrl}>
              <Download size={18} aria-hidden="true" />
              Exportar datos
            </a>
          </Button>
        </div>
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-[1fr_1fr]">
        <div className="rounded-lg border bg-surface p-5">
          <div className="flex items-center gap-2">
            <UserCircle size={20} className="text-primary" aria-hidden="true" />
            <h2 className="text-lg font-semibold">Identidad</h2>
          </div>
          <div className="mt-5 grid gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Nombre visible</p>
              <p className="mt-1 font-medium">{currentUser.name ?? "Aprendiz"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Modo</p>
              <p className="mt-1 font-medium">{currentUser.isDemo ? "Demo" : "Cuenta real"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">ID interno</p>
              <p className="mt-1 break-all font-medium">{currentUser.id}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-surface p-5">
          <div className="flex items-center gap-2">
            <Mail size={20} className="text-primary" aria-hidden="true" />
            <h2 className="text-lg font-semibold">Contacto</h2>
          </div>
          <div className="mt-5 grid gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="mt-1 break-all font-medium">
                {profile?.email ?? currentUser.email ?? "Sin email"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Creado</p>
              <p className="mt-1 font-medium">{formatDate(profile?.createdAt)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Actualizado</p>
              <p className="mt-1 font-medium">{formatDate(profile?.updatedAt)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-lg border bg-surface p-5">
        <div className="flex items-center gap-2">
          <Gauge size={20} className="text-primary" aria-hidden="true" />
          <h2 className="text-lg font-semibold">Ritmo de aprendizaje</h2>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-md border bg-background p-4">
            <p className="text-sm text-muted-foreground">Quests por semana</p>
            <p className="mt-3 text-2xl font-semibold">
              {profile?.preferences.questionsPerWeek ?? 0}
            </p>
          </div>
          <div className="rounded-md border bg-background p-4">
            <p className="text-sm text-muted-foreground">Tips por semana</p>
            <p className="mt-3 text-2xl font-semibold">{profile?.preferences.tipsPerWeek ?? 0}</p>
          </div>
          <div className="rounded-md border bg-background p-4">
            <p className="text-sm text-muted-foreground">Estado</p>
            <p className="mt-3 text-2xl font-semibold">
              {profile?.preferences.isPaused ? "Pausado" : "Activo"}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
