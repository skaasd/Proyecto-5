import type { LearningOverviewRepository } from "../ports/learning-overview-repository.js";
import type { UserRepository } from "../ports/user-repository.js";
import { UseCaseError } from "./errors.js";

export type GetLearningOverviewInput = {
  userId: string;
};

export type GetLearningOverviewResult = {
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

type Dependencies = {
  users: UserRepository;
  overview: LearningOverviewRepository;
};

export class GetLearningOverview {
  constructor(private readonly dependencies: Dependencies) {}

  async execute(input: GetLearningOverviewInput): Promise<GetLearningOverviewResult> {
    const user = await this.dependencies.users.findById(input.userId);

    if (!user) {
      throw new UseCaseError("No encontramos ese usuario.", "USER_NOT_FOUND");
    }

    const overview = await this.dependencies.overview.getByUserId(input.userId);
    const accuracyRate =
      overview.totalResponses > 0 ? overview.correctResponses / overview.totalResponses : null;

    return {
      overview: {
        userId: overview.userId,
        totalResponses: overview.totalResponses,
        correctResponses: overview.correctResponses,
        accuracyRate,
        conceptsExplored: overview.conceptsExplored,
        totalTimeMs: overview.totalTimeMs,
        lastActivityAt: overview.lastActivityAt?.toISOString(),
        nextReviewAt: overview.nextReviewAt?.toISOString(),
        recentResponses: overview.recentResponses.map((response) => ({
          id: response.id,
          questionId: response.questionId,
          questionPrompt: response.questionPrompt,
          answerText: response.answerText,
          outcome: response.isCorrect ? "expected" : "review",
          submittedAt: response.submittedAt.toISOString(),
        })),
      },
    };
  }
}
