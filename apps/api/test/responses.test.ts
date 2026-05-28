import type {
  ExportUserDataResult,
  GetGameProfileResult,
  GetLearningOverviewResult,
  GetUserPreferencesResult,
  GetUserProfileResult,
  SetLearningPauseResult,
  SubmitUserResponseResult,
  UpdateUserPreferencesResult,
  UserResponse,
} from "@project-name/core";
import {
  ExportUserData,
  GetGameProfile,
  GetLearningOverview,
  GetNextQuestion,
  GetUserPreferences,
  GetUserProfile,
  SetLearningPause,
  SubmitUserResponse,
  UpdateUserPreferences,
} from "@project-name/core";
import { afterEach, describe, expect, it } from "vitest";
import { buildApp } from "../src/app.js";

const submittedAt = new Date("2026-05-27T12:00:00.000Z");

class FakeExportUserData extends ExportUserData {
  constructor() {
    super({
      users: { findById: async () => null },
      exports: {
        exportByUserId: async () => {
          throw new Error("not used");
        },
      },
      now: () => submittedAt,
    });
  }

  override async execute(): Promise<ExportUserDataResult> {
    throw new Error("not used");
  }
}

class FakeGetGameProfile extends GetGameProfile {
  constructor() {
    super({
      users: { findById: async () => null },
      gameProfiles: {
        getActivitySnapshotByUserId: async () => ({
          userId: "user_1",
          totalResponses: 0,
          correctResponses: 0,
          conceptsExplored: 0,
          activeDays: 0,
          concepts: [],
        }),
      },
    });
  }

  override async execute(): Promise<GetGameProfileResult> {
    throw new Error("not used");
  }
}

function responseFixture(): UserResponse {
  return {
    id: "response_1",
    userId: "user_1",
    questionId: "question_1",
    answerId: "answer_1",
    isCorrect: true,
    responseTimeMs: 5000,
    attemptNumber: 1,
    channel: "web",
    submittedAt,
  };
}

class FakeSubmitUserResponse extends SubmitUserResponse {
  public calls: unknown[] = [];

  constructor() {
    super({
      users: { findById: async () => null },
      questions: {
        findByIdWithAnswers: async () => null,
        findNextForUser: async () => null,
        saveUserResponse: async () => responseFixture(),
      },
      events: { append: async () => undefined },
      scheduler: { recordReview: async () => undefined },
      now: () => submittedAt,
    });
  }

  override async execute(
    input: Parameters<SubmitUserResponse["execute"]>[0],
  ): Promise<SubmitUserResponseResult> {
    this.calls.push(input);

    return {
      response: responseFixture(),
      feedback: "Tu respuesta coincide con la esperada.",
    };
  }
}

class FakeGetNextQuestion extends GetNextQuestion {
  constructor() {
    super({
      users: { findById: async () => null },
      questions: {
        findByIdWithAnswers: async () => null,
        findNextForUser: async () => null,
        saveUserResponse: async () => responseFixture(),
      },
    });
  }
}

class FakeGetLearningOverview extends GetLearningOverview {
  constructor() {
    super({
      users: { findById: async () => null },
      overview: {
        getByUserId: async () => ({
          userId: "user_1",
          totalResponses: 0,
          correctResponses: 0,
          conceptsExplored: 0,
          totalTimeMs: 0,
          recentResponses: [],
        }),
      },
    });
  }

  override async execute(): Promise<GetLearningOverviewResult> {
    return {
      overview: {
        userId: "user_1",
        totalResponses: 0,
        correctResponses: 0,
        accuracyRate: null,
        conceptsExplored: 0,
        totalTimeMs: 0,
        recentResponses: [],
      },
    };
  }
}

class FakeGetUserProfile extends GetUserProfile {
  constructor() {
    super({
      users: { findById: async () => null },
      preferences: {
        getByUserId: async () => {
          throw new Error("not used");
        },
        setPause: async () => {
          throw new Error("not used");
        },
        updateCadence: async () => {
          throw new Error("not used");
        },
      },
    });
  }

  override async execute(): Promise<GetUserProfileResult> {
    throw new Error("not used");
  }
}

class FakeGetUserPreferences extends GetUserPreferences {
  constructor() {
    super({
      users: { findById: async () => null },
      preferences: {
        getByUserId: async () => ({
          userId: "user_1",
          questionsPerWeek: 5,
          tipsPerWeek: 2,
          isPaused: false,
        }),
        setPause: async () => {
          throw new Error("not used");
        },
        updateCadence: async () => {
          throw new Error("not used");
        },
      },
    });
  }

  override async execute(): Promise<GetUserPreferencesResult> {
    return {
      preferences: {
        userId: "user_1",
        questionsPerWeek: 5,
        tipsPerWeek: 2,
        isPaused: false,
      },
    };
  }
}

class FakeSetLearningPause extends SetLearningPause {
  constructor() {
    super({
      users: { findById: async () => null },
      preferences: {
        getByUserId: async () => {
          throw new Error("not used");
        },
        setPause: async () => {
          throw new Error("not used");
        },
        updateCadence: async () => {
          throw new Error("not used");
        },
      },
    });
  }

  override async execute(): Promise<SetLearningPauseResult> {
    throw new Error("not used");
  }
}

class FakeUpdateUserPreferences extends UpdateUserPreferences {
  constructor() {
    super({
      users: { findById: async () => null },
      preferences: {
        getByUserId: async () => {
          throw new Error("not used");
        },
        setPause: async () => {
          throw new Error("not used");
        },
        updateCadence: async () => {
          throw new Error("not used");
        },
      },
    });
  }

  override async execute(): Promise<UpdateUserPreferencesResult> {
    throw new Error("not used");
  }
}

describe("POST /api/responses", () => {
  const apps: Array<Awaited<ReturnType<typeof buildApp>>> = [];

  afterEach(async () => {
    await Promise.all(apps.map((app) => app.close()));
    apps.length = 0;
  });

  it("valida el body y delega en SubmitUserResponse", async () => {
    const useCase = new FakeSubmitUserResponse();
    const app = await buildApp({
      exportUserData: new FakeExportUserData(),
      getGameProfile: new FakeGetGameProfile(),
      getLearningOverview: new FakeGetLearningOverview(),
      getNextQuestion: new FakeGetNextQuestion(),
      getUserProfile: new FakeGetUserProfile(),
      getUserPreferences: new FakeGetUserPreferences(),
      setLearningPause: new FakeSetLearningPause(),
      submitUserResponse: useCase,
      updateUserPreferences: new FakeUpdateUserPreferences(),
      logger: false,
    });
    apps.push(app);

    const response = await app.inject({
      method: "POST",
      url: "/api/responses",
      payload: {
        userId: "user_1",
        questionId: "question_1",
        answerId: "answer_1",
        responseTimeMs: 5000,
        attemptNumber: 1,
        channel: "web",
      },
    });

    const body = JSON.parse(response.body) as SubmitUserResponseResult;

    expect(response.statusCode).toBe(201);
    expect(body.feedback).toContain("coincide");
    expect(useCase.calls).toHaveLength(1);
  });

  it("rechaza registrar respuestas a nombre de otro usuario", async () => {
    const useCase = new FakeSubmitUserResponse();
    const app = await buildApp({
      exportUserData: new FakeExportUserData(),
      getGameProfile: new FakeGetGameProfile(),
      getLearningOverview: new FakeGetLearningOverview(),
      getNextQuestion: new FakeGetNextQuestion(),
      getUserProfile: new FakeGetUserProfile(),
      getUserPreferences: new FakeGetUserPreferences(),
      setLearningPause: new FakeSetLearningPause(),
      submitUserResponse: useCase,
      updateUserPreferences: new FakeUpdateUserPreferences(),
      userAccess: {
        mode: "internal",
        internalApiSecret: "test-secret",
      },
      logger: false,
    });
    apps.push(app);

    const response = await app.inject({
      method: "POST",
      url: "/api/responses",
      headers: {
        "x-current-user-id": "user_1",
        "x-internal-api-secret": "test-secret",
      },
      payload: {
        userId: "user_2",
        questionId: "question_1",
        answerId: "answer_1",
        responseTimeMs: 5000,
        attemptNumber: 1,
        channel: "web",
      },
    });

    const body = JSON.parse(response.body) as { error: string };

    expect(response.statusCode).toBe(403);
    expect(body.error).toBe("USER_ACCESS_DENIED");
    expect(useCase.calls).toEqual([]);
  });
});
