import { PortfolioView } from "@/components/portfolio-view";
import { buildUserApiHeaders, getApiBaseUrl } from "@/lib/api-client";
import { type CurrentUser, getCurrentUser } from "@/lib/current-user";
import { buildPortfolioData } from "@/lib/portfolio-data";

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

type GameProfileResponse = {
  gameProfile: {
    userId: string;
    level: number;
    totalXp: number;
    coins: number;
    constanciaDays: number;
  };
};

async function fetchUserJson<T>(currentUser: CurrentUser, path: string): Promise<T | null> {
  try {
    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      cache: "no-store",
      headers: buildUserApiHeaders(currentUser),
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export default async function PortfolioPage() {
  const currentUser = await getCurrentUser();
  const [profileResponse, overviewResponse, gameProfileResponse] = await Promise.all([
    fetchUserJson<UserProfileResponse>(currentUser, `/api/users/${currentUser.id}/profile`),
    fetchUserJson<LearningOverviewResponse>(currentUser, `/api/users/${currentUser.id}/overview`),
    fetchUserJson<GameProfileResponse>(currentUser, `/api/users/${currentUser.id}/game-profile`),
  ]);

  const data = buildPortfolioData({
    currentUserName: currentUser.name,
    email: profileResponse?.profile.email ?? currentUser.email,
    createdAt: profileResponse?.profile.createdAt,
    totalTimeMs: overviewResponse?.overview.totalTimeMs,
    conceptsExplored: overviewResponse?.overview.conceptsExplored,
    totalResponses: overviewResponse?.overview.totalResponses,
    constanciaDays: gameProfileResponse?.gameProfile.constanciaDays,
    level: gameProfileResponse?.gameProfile.level,
  });

  return <PortfolioView data={data} />;
}
