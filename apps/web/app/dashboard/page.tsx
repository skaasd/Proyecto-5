import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { buildUserApiHeaders, getApiBaseUrl } from "@/lib/api-client";
import { type CurrentUser, getCurrentUser } from "@/lib/current-user";
import {
  BadgeGrid,
  CoinDisplay,
  ConstanciaIndicator,
  LevelBadge,
  QuestSceneCard,
  SkillNode,
  XPBar,
} from "@project-name/ui";
import { CalendarDays, Download, LineChart, LogOut, PauseCircle, UserCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type NextQuestionResponse = {
  question: {
    id: string;
    prompt: string;
    concepts: Array<{ id: string; name: string }>;
    answers: Array<{ id: string; text: string }>;
  } | null;
};

type LearningOverviewResponse = {
  overview: {
    userId: string;
    totalResponses: number;
    correctResponses: number;
    accuracyRate: number | null;
    conceptsExplored: number;
    totalTimeMs: number;
    lastActivityAt?: string;
    nextReviewAt?: string;
    recentResponses: Array<{
      id: string;
      questionId: string;
      questionPrompt: string;
      answerText?: string;
      outcome: "expected" | "review";
      submittedAt: string;
    }>;
  };
};

type UserPreferencesResponse = {
  preferences: {
    userId: string;
    questionsPerWeek: number;
    tipsPerWeek: number;
    isPaused: boolean;
    pausedUntil?: string;
  };
};

type GameProfileResponse = {
  gameProfile: {
    userId: string;
    level: number;
    totalXp: number;
    coins: number;
    constanciaDays: number;
    currentLevelXp: number;
    nextLevelXp: number;
    badges: Array<{
      title: string;
      rarity: "common" | "rare" | "epic";
      isLocked?: boolean;
    }>;
    skillNodes: Array<{
      label: string;
      level: string;
      state: "mastered" | "active" | "locked";
    }>;
  };
};

const demoSkillNodes = [
  { label: "Fundamentos QA", level: "Nivel II", state: "mastered" as const },
  { label: "Pruebas de humo", level: "Nivel I", state: "active" as const },
  { label: "Regresión", level: "Nivel I", state: "active" as const },
  { label: "Automatización", level: "Por descubrir", state: "locked" as const },
];

const demoBadges = [
  { title: "Primer movimiento", rarity: "common" as const },
  { title: "Observador constante", rarity: "rare" as const },
  { title: "Cartógrafo QA", rarity: "epic" as const, isLocked: true },
  { title: "Ruta de regresión", rarity: "rare" as const, isLocked: true },
];

async function signOutCurrentUser() {
  "use server";

  await signOut({
    redirectTo: "/login",
  });
}

async function submitUserResponse(formData: FormData) {
  "use server";

  const currentUser = await getCurrentUser();
  const questionId = formData.get("questionId");
  const answerId = formData.get("answerId");

  if (typeof questionId !== "string" || typeof answerId !== "string") {
    redirect("/dashboard?feedback=Elige%20un%20movimiento%20para%20registrar%20tu%20avance.");
  }

  const response = await fetch(`${getApiBaseUrl()}/api/responses`, {
    method: "POST",
    headers: buildUserApiHeaders(currentUser, {
      "content-type": "application/json",
    }),
    body: JSON.stringify({
      userId: currentUser.id,
      questionId,
      answerId,
      responseTimeMs: 60_000,
      attemptNumber: 1,
      channel: "web",
    }),
  });

  if (!response.ok) {
    redirect("/dashboard?feedback=No%20pudimos%20registrar%20el%20movimiento%20todav%C3%ADa.");
  }

  const result = (await response.json()) as { feedback?: string };
  const feedback = encodeURIComponent(result.feedback ?? "Movimiento registrado.");
  redirect(`/dashboard?feedback=${feedback}`);
}

async function toggleLearningPause(formData: FormData) {
  "use server";

  const currentUser = await getCurrentUser();
  const isPaused = formData.get("isPaused") === "true";

  const response = await fetch(`${getApiBaseUrl()}/api/users/${currentUser.id}/pause`, {
    method: "POST",
    headers: buildUserApiHeaders(currentUser, {
      "content-type": "application/json",
    }),
    body: JSON.stringify({
      isPaused,
    }),
  });

  const feedback = isPaused
    ? "Pausamos las quests. Tu avance sigue guardado."
    : "Reanudamos la ruta. Sin apuro, seguimos desde aquí.";

  if (!response.ok) {
    redirect("/dashboard?feedback=No%20pudimos%20actualizar%20la%20pausa%20todav%C3%ADa.");
  }

  redirect(`/dashboard?feedback=${encodeURIComponent(feedback)}`);
}

async function updateLearningCadence(formData: FormData) {
  "use server";

  const currentUser = await getCurrentUser();
  const questionsPerWeek = Number(formData.get("questionsPerWeek"));
  const tipsPerWeek = Number(formData.get("tipsPerWeek"));

  const response = await fetch(`${getApiBaseUrl()}/api/users/${currentUser.id}/preferences`, {
    method: "PATCH",
    headers: buildUserApiHeaders(currentUser, {
      "content-type": "application/json",
    }),
    body: JSON.stringify({
      questionsPerWeek,
      tipsPerWeek,
    }),
  });

  if (!response.ok) {
    redirect("/dashboard?feedback=No%20pudimos%20actualizar%20el%20ritmo%20todav%C3%ADa.");
  }

  redirect("/dashboard?feedback=Actualizamos%20tu%20ritmo%20de%20aprendizaje.");
}

async function getNextQuestion(currentUser: CurrentUser): Promise<NextQuestionResponse | null> {
  try {
    const response = await fetch(`${getApiBaseUrl()}/api/questions/next?userId=${currentUser.id}`, {
      cache: "no-store",
      headers: buildUserApiHeaders(currentUser),
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as NextQuestionResponse;
  } catch {
    return null;
  }
}

async function getUserPreferences(
  currentUser: CurrentUser,
): Promise<UserPreferencesResponse | null> {
  try {
    const response = await fetch(`${getApiBaseUrl()}/api/users/${currentUser.id}/preferences`, {
      cache: "no-store",
      headers: buildUserApiHeaders(currentUser),
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as UserPreferencesResponse;
  } catch {
    return null;
  }
}

async function getLearningOverview(
  currentUser: CurrentUser,
): Promise<LearningOverviewResponse | null> {
  try {
    const response = await fetch(`${getApiBaseUrl()}/api/users/${currentUser.id}/overview`, {
      cache: "no-store",
      headers: buildUserApiHeaders(currentUser),
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as LearningOverviewResponse;
  } catch {
    return null;
  }
}

async function getGameProfile(currentUser: CurrentUser): Promise<GameProfileResponse | null> {
  try {
    const response = await fetch(`${getApiBaseUrl()}/api/users/${currentUser.id}/game-profile`, {
      cache: "no-store",
      headers: buildUserApiHeaders(currentUser),
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as GameProfileResponse;
  } catch {
    return null;
  }
}

function getExportUrl() {
  return "/api/learning-export";
}

function formatTime(totalTimeMs: number) {
  const minutes = Math.round(totalTimeMs / 60_000);

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours} h ${remainingMinutes} min` : `${hours} h`;
}

function formatAccuracy(accuracyRate: number | null) {
  if (accuracyRate === null) {
    return "Sin datos";
  }

  return `${Math.round(accuracyRate * 100)}%`;
}

function formatNextReview(nextReviewAt?: string) {
  if (!nextReviewAt) {
    return "Aparecerá cuando registres tu primer movimiento.";
  }

  return new Date(nextReviewAt).toLocaleString("es-CL", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatActivityDate(submittedAt: string) {
  return new Date(submittedAt).toLocaleString("es-CL", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { feedback?: string };
}) {
  const currentUser = await getCurrentUser();
  const [nextQuestion, learningOverview, userPreferencesResponse, gameProfileResponse] =
    await Promise.all([
      getNextQuestion(currentUser),
      getLearningOverview(currentUser),
      getUserPreferences(currentUser),
      getGameProfile(currentUser),
    ]);
  const userPreferences = userPreferencesResponse?.preferences;
  const feedback = searchParams?.feedback;
  const overview = learningOverview?.overview;
  const gameProfile = gameProfileResponse?.gameProfile ?? {
    level: 1,
    totalXp: 0,
    coins: 0,
    constanciaDays: 0,
    currentLevelXp: 0,
    nextLevelXp: 120,
    badges: demoBadges.map((badge) => ({ ...badge, isLocked: true })),
    skillNodes: demoSkillNodes.map((node) => ({ ...node, state: "locked" as const })),
  };
  const isPaused = userPreferences?.isPaused ?? false;
  const accuracyPercent = Math.round((overview?.accuracyRate ?? 0) * 100);
  const questionsPercent = Math.min((overview?.totalResponses ?? 0) * 20, 100);
  const exportUrl = getExportUrl();
  const metrics = [
    { label: "Conceptos explorados", value: String(overview?.conceptsExplored ?? 0) },
    { label: "Movimientos registrados", value: String(overview?.totalResponses ?? 0) },
    { label: "Tiempo en observatorio", value: formatTime(overview?.totalTimeMs ?? 0) },
  ];

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-8">
      <header className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-accent">Observatorio</p>
          <h1 className="mt-2 text-3xl font-semibold">Tu trayectoria en QA</h1>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <UserCircle size={16} aria-hidden="true" />
            <span>{currentUser.name ?? currentUser.email ?? "Aprendiz"}</span>
            {currentUser.isDemo ? (
              <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">Modo demo</span>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <a href={exportUrl}>
              <Download size={18} aria-hidden="true" />
              Exportar datos
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/profile">
              <UserCircle size={18} aria-hidden="true" />
              Perfil
            </Link>
          </Button>
          <form action={toggleLearningPause}>
            <input name="isPaused" type="hidden" value={isPaused ? "false" : "true"} />
            <Button type="submit" variant="outline">
              <PauseCircle size={18} aria-hidden="true" />
              {isPaused ? "Reanudar ruta" : "Pausar quests"}
            </Button>
          </form>
          {currentUser.isDemo ? (
            <Button asChild variant="outline">
              <Link href="/login">Entrar</Link>
            </Button>
          ) : (
            <form action={signOutCurrentUser}>
              <Button type="submit" variant="outline">
                <LogOut size={18} aria-hidden="true" />
                Salir
              </Button>
            </form>
          )}
        </div>
      </header>

      <section className="mt-8 rounded-lg border bg-surface p-5">
        <div className="grid gap-5 lg:grid-cols-[auto_auto_auto_1fr] lg:items-center">
          <LevelBadge level={gameProfile.level} />
          <CoinDisplay coins={gameProfile.coins} />
          <ConstanciaIndicator days={gameProfile.constanciaDays} />
          <XPBar
            currentXp={gameProfile.totalXp}
            currentLevelXp={gameProfile.currentLevelXp}
            nextLevelXp={gameProfile.nextLevelXp}
            label="Próximo desbloqueo"
          />
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <div className="rounded-lg border bg-surface p-5" key={metric.label}>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="mt-3 text-2xl font-semibold">{metric.value}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-lg border bg-surface p-5">
        <div>
          <p className="text-sm font-medium text-accent">Ritmo</p>
          <h2 className="mt-2 text-xl font-semibold">Preferencias semanales</h2>
        </div>

        <form
          action={updateLearningCadence}
          className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end"
        >
          <label className="grid gap-2 text-sm font-medium" htmlFor="questionsPerWeek">
            Quests por semana
            <input
              className="h-11 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              defaultValue={userPreferences?.questionsPerWeek ?? 5}
              id="questionsPerWeek"
              max={21}
              min={1}
              name="questionsPerWeek"
              type="number"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium" htmlFor="tipsPerWeek">
            Tips por semana
            <input
              className="h-11 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              defaultValue={userPreferences?.tipsPerWeek ?? 2}
              id="tipsPerWeek"
              max={14}
              min={0}
              name="tipsPerWeek"
              type="number"
            />
          </label>

          <Button type="submit">Guardar ritmo</Button>
        </form>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-lg border bg-surface p-5">
          <div className="flex items-center gap-2">
            <LineChart size={20} className="text-primary" aria-hidden="true" />
            <h2 className="text-lg font-semibold">Mapa de habilidades</h2>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {gameProfile.skillNodes.map((node) => (
              <SkillNode
                key={node.label}
                label={node.label}
                level={node.level}
                state={node.state}
              />
            ))}
          </div>
          <div className="mt-6 grid gap-4">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Lectura consolidada</span>
                <span className="font-medium">
                  {formatAccuracy(overview?.accuracyRate ?? null)}
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${accuracyPercent}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Quests recorridas</span>
                <span className="font-medium">{overview?.totalResponses ?? 0}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-accent"
                  style={{ width: `${questionsPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-surface p-5">
          <div className="flex items-center gap-2">
            <CalendarDays size={20} className="text-primary" aria-hidden="true" />
            <h2 className="text-lg font-semibold">Siguiente movimiento</h2>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            {formatNextReview(overview?.nextReviewAt)}
          </p>
        </div>
      </section>

      <QuestSceneCard
        eyebrow="Quest activa"
        reward="+30 XP · +8 monedas"
        title="Movimiento sugerido"
      >
        {feedback ? (
          <div className="mt-5 rounded-md border bg-muted p-4 text-sm leading-6">{feedback}</div>
        ) : null}

        {isPaused ? (
          <div className="mt-6 rounded-md border bg-muted p-4 text-sm leading-6 text-muted-foreground">
            La ruta está en pausa. Tu trayectoria queda guardada y puedes volver cuando estés listo.
          </div>
        ) : nextQuestion?.question ? (
          <form action={submitUserResponse} className="mt-6 grid gap-5">
            <input name="questionId" type="hidden" value={nextQuestion.question.id} />
            <p className="text-base leading-7">{nextQuestion.question.prompt}</p>

            <div className="flex flex-wrap gap-2">
              {nextQuestion.question.concepts.map((concept) => (
                <span
                  className="rounded-md bg-muted px-3 py-1 text-xs text-muted-foreground"
                  key={concept.id}
                >
                  {concept.name}
                </span>
              ))}
            </div>

            <div className="grid gap-3">
              {nextQuestion.question.answers.map((answer) => (
                <label
                  className="flex gap-3 rounded-md border bg-background p-3 text-sm"
                  key={answer.id}
                >
                  <input className="mt-1" name="answerId" required type="radio" value={answer.id} />
                  <span>{answer.text}</span>
                </label>
              ))}
            </div>

            <div>
              <Button type="submit">Registrar movimiento</Button>
            </div>
          </form>
        ) : (
          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            Levanta la API y carga el seed para ver la primera quest demo.
          </p>
        )}
      </QuestSceneCard>

      <section className="mt-8 rounded-lg border bg-surface p-5">
        <div>
          <p className="text-sm font-medium text-accent">Colección</p>
          <h2 className="mt-2 text-xl font-semibold">Insignias de ruta</h2>
        </div>
        <div className="mt-6">
          <BadgeGrid badges={gameProfile.badges} />
        </div>
      </section>

      <section className="mt-8 rounded-lg border bg-surface p-5">
        <div>
          <p className="text-sm font-medium text-accent">Evidencia reciente</p>
          <h2 className="mt-2 text-xl font-semibold">Últimos movimientos</h2>
        </div>

        {overview?.recentResponses.length ? (
          <div className="mt-6 grid gap-3">
            {overview.recentResponses.map((response) => (
              <article className="rounded-md border bg-background p-4" key={response.id}>
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm leading-6">{response.questionPrompt}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Tu movimiento: {response.answerText ?? "Movimiento registrado"}
                    </p>
                  </div>
                  <span className="w-fit rounded-md bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {response.outcome === "expected"
                      ? "Coincide con lo esperado"
                      : "Para revisar con calma"}
                  </span>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Registrada el {formatActivityDate(response.submittedAt)}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            Cuando recorras una quest, aparecerá aquí como parte de tu trayectoria.
          </p>
        )}
      </section>
    </main>
  );
}
