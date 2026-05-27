import type {
  ExportUserDataResult,
  GetLearningOverviewResult,
  GetUserPreferencesResult,
  GetUserProfileResult,
  SetLearningPauseResult,
  UpdateUserPreferencesResult,
  UserResponse,
} from "@project-name/core";
import {
  ExportUserData,
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

class FakeExportUserData extends ExportUserData {
  public calls: unknown[] = [];

  constructor() {
    super({
      users: { findById: async () => null },
      exports: {
        exportByUserId: async () => {
          throw new Error("not used");
        },
      },
      now: () => new Date("2026-05-27T12:00:00.000Z"),
    });
  }

  override async execute(
    input: Parameters<ExportUserData["execute"]>[0],
  ): Promise<ExportUserDataResult> {
    this.calls.push(input);

    return {
      data: {
        exportedAt: "2026-05-27T12:00:00.000Z",
        user: {
          id: input.userId,
          email: "demo@example.com",
          createdAt: "2026-05-27T10:00:00.000Z",
        },
        preferences: {
          questionsPerWeek: 5,
          tipsPerWeek: 2,
          isPaused: false,
        },
        responses: [],
        learningEvents: [],
        spacedRepetitionStates: [],
      },
    };
  }
}

class FakeGetLearningOverview extends GetLearningOverview {
  public calls: unknown[] = [];

  constructor() {
    super({
      users: { findById: async () => null },
      overview: {
        getByUserId: async () => ({
          userId: "user_1",
          totalResponses: 2,
          correctResponses: 1,
          conceptsExplored: 3,
          totalTimeMs: 120_000,
          recentResponses: [
            {
              id: "response_1",
              questionId: "question_1",
              questionPrompt: "¿Qué aporta una prueba de humo?",
              answerText: "Una señal rápida",
              isCorrect: true,
              submittedAt: new Date("2026-05-27T12:00:00.000Z"),
            },
          ],
        }),
      },
    });
  }

  override async execute(
    input: Parameters<GetLearningOverview["execute"]>[0],
  ): Promise<GetLearningOverviewResult> {
    this.calls.push(input);

    return {
      overview: {
        userId: input.userId,
        totalResponses: 2,
        correctResponses: 1,
        accuracyRate: 0.5,
        conceptsExplored: 3,
        totalTimeMs: 120_000,
        recentResponses: [
          {
            id: "response_1",
            questionId: "question_1",
            questionPrompt: "¿Qué aporta una prueba de humo?",
            answerText: "Una señal rápida",
            outcome: "expected",
            submittedAt: "2026-05-27T12:00:00.000Z",
          },
        ],
      },
    };
  }
}

class FakeGetUserProfile extends GetUserProfile {
  public calls: unknown[] = [];

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

  override async execute(
    input: Parameters<GetUserProfile["execute"]>[0],
  ): Promise<GetUserProfileResult> {
    this.calls.push(input);

    return {
      profile: {
        id: input.userId,
        email: "demo@example.com",
        createdAt: "2026-05-27T10:00:00.000Z",
        updatedAt: "2026-05-27T11:00:00.000Z",
        preferences: {
          questionsPerWeek: 5,
          tipsPerWeek: 2,
          isPaused: false,
        },
      },
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
        saveUserResponse: async () => {
          throw new Error("not used");
        },
      },
    });
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
  public calls: unknown[] = [];

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
        setPause: async (input) => ({
          userId: input.userId,
          questionsPerWeek: 5,
          tipsPerWeek: 2,
          isPaused: input.isPaused,
          pausedUntil: input.pausedUntil,
        }),
        updateCadence: async () => {
          throw new Error("not used");
        },
      },
    });
  }

  override async execute(
    input: Parameters<SetLearningPause["execute"]>[0],
  ): Promise<SetLearningPauseResult> {
    this.calls.push(input);

    return {
      preferences: {
        userId: input.userId,
        questionsPerWeek: 5,
        tipsPerWeek: 2,
        isPaused: input.isPaused,
        pausedUntil: input.pausedUntil?.toISOString(),
      },
    };
  }
}

class FakeUpdateUserPreferences extends UpdateUserPreferences {
  public calls: unknown[] = [];

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
        updateCadence: async (input) => ({
          userId: input.userId,
          questionsPerWeek: input.questionsPerWeek,
          tipsPerWeek: input.tipsPerWeek,
          isPaused: false,
        }),
      },
    });
  }

  override async execute(
    input: Parameters<UpdateUserPreferences["execute"]>[0],
  ): Promise<UpdateUserPreferencesResult> {
    this.calls.push(input);

    return {
      preferences: {
        userId: input.userId,
        questionsPerWeek: input.questionsPerWeek,
        tipsPerWeek: input.tipsPerWeek,
        isPaused: false,
      },
    };
  }
}

class FakeSubmitUserResponse extends SubmitUserResponse {
  constructor() {
    super({
      users: { findById: async () => null },
      questions: {
        findByIdWithAnswers: async () => null,
        findNextForUser: async () => null,
        saveUserResponse: async () => {
          throw new Error("not used");
        },
      },
      events: { append: async () => undefined },
      scheduler: { recordReview: async () => undefined },
      now: () => new Date("2026-05-27T12:00:00.000Z"),
    });
  }

  override async execute(): Promise<{ response: UserResponse; feedback: string }> {
    throw new Error("not used");
  }
}

describe("GET /api/users/:userId/overview", () => {
  const apps: Array<Awaited<ReturnType<typeof buildApp>>> = [];

  afterEach(async () => {
    await Promise.all(apps.map((app) => app.close()));
    apps.length = 0;
  });

  it("devuelve métricas de trayectoria del usuario", async () => {
    const useCase = new FakeGetLearningOverview();
    const app = await buildApp({
      exportUserData: new FakeExportUserData(),
      getLearningOverview: useCase,
      getNextQuestion: new FakeGetNextQuestion(),
      getUserProfile: new FakeGetUserProfile(),
      getUserPreferences: new FakeGetUserPreferences(),
      setLearningPause: new FakeSetLearningPause(),
      submitUserResponse: new FakeSubmitUserResponse(),
      updateUserPreferences: new FakeUpdateUserPreferences(),
      logger: false,
    });
    apps.push(app);

    const response = await app.inject({
      method: "GET",
      url: "/api/users/user_1/overview",
    });

    const body = JSON.parse(response.body) as GetLearningOverviewResult;

    expect(response.statusCode).toBe(200);
    expect(body.overview).toEqual({
      userId: "user_1",
      totalResponses: 2,
      correctResponses: 1,
      accuracyRate: 0.5,
      conceptsExplored: 3,
      totalTimeMs: 120_000,
      recentResponses: [
        {
          id: "response_1",
          questionId: "question_1",
          questionPrompt: "¿Qué aporta una prueba de humo?",
          answerText: "Una señal rápida",
          outcome: "expected",
          submittedAt: "2026-05-27T12:00:00.000Z",
        },
      ],
    });
    expect(useCase.calls).toEqual([{ userId: "user_1" }]);
  });

  it("actualiza el estado de pausa del usuario", async () => {
    const pause = new FakeSetLearningPause();
    const app = await buildApp({
      exportUserData: new FakeExportUserData(),
      getLearningOverview: new FakeGetLearningOverview(),
      getNextQuestion: new FakeGetNextQuestion(),
      getUserProfile: new FakeGetUserProfile(),
      getUserPreferences: new FakeGetUserPreferences(),
      setLearningPause: pause,
      submitUserResponse: new FakeSubmitUserResponse(),
      updateUserPreferences: new FakeUpdateUserPreferences(),
      logger: false,
    });
    apps.push(app);

    const response = await app.inject({
      method: "POST",
      url: "/api/users/user_1/pause",
      payload: {
        isPaused: true,
      },
    });

    const body = JSON.parse(response.body) as SetLearningPauseResult;

    expect(response.statusCode).toBe(200);
    expect(body.preferences.isPaused).toBe(true);
    expect(pause.calls).toEqual([{ userId: "user_1", isPaused: true }]);
  });

  it("actualiza el ritmo semanal de aprendizaje", async () => {
    const updatePreferences = new FakeUpdateUserPreferences();
    const app = await buildApp({
      exportUserData: new FakeExportUserData(),
      getLearningOverview: new FakeGetLearningOverview(),
      getNextQuestion: new FakeGetNextQuestion(),
      getUserProfile: new FakeGetUserProfile(),
      getUserPreferences: new FakeGetUserPreferences(),
      setLearningPause: new FakeSetLearningPause(),
      submitUserResponse: new FakeSubmitUserResponse(),
      updateUserPreferences: updatePreferences,
      logger: false,
    });
    apps.push(app);

    const response = await app.inject({
      method: "PATCH",
      url: "/api/users/user_1/preferences",
      payload: {
        questionsPerWeek: 7,
        tipsPerWeek: 3,
      },
    });

    const body = JSON.parse(response.body) as UpdateUserPreferencesResult;

    expect(response.statusCode).toBe(200);
    expect(body.preferences.questionsPerWeek).toBe(7);
    expect(body.preferences.tipsPerWeek).toBe(3);
    expect(updatePreferences.calls).toEqual([
      { userId: "user_1", questionsPerWeek: 7, tipsPerWeek: 3 },
    ]);
  });

  it("exporta los datos de aprendizaje del usuario como JSON descargable", async () => {
    const exportUserData = new FakeExportUserData();
    const app = await buildApp({
      exportUserData,
      getLearningOverview: new FakeGetLearningOverview(),
      getNextQuestion: new FakeGetNextQuestion(),
      getUserProfile: new FakeGetUserProfile(),
      getUserPreferences: new FakeGetUserPreferences(),
      setLearningPause: new FakeSetLearningPause(),
      submitUserResponse: new FakeSubmitUserResponse(),
      updateUserPreferences: new FakeUpdateUserPreferences(),
      logger: false,
    });
    apps.push(app);

    const response = await app.inject({
      method: "GET",
      url: "/api/users/user_1/export",
    });

    const body = JSON.parse(response.body) as ExportUserDataResult["data"];

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-disposition"]).toBe(
      'attachment; filename="user_1-learning-export.json"',
    );
    expect(body.user.email).toBe("demo@example.com");
    expect(exportUserData.calls).toEqual([{ userId: "user_1" }]);
  });

  it("devuelve el perfil básico del usuario", async () => {
    const getUserProfile = new FakeGetUserProfile();
    const app = await buildApp({
      exportUserData: new FakeExportUserData(),
      getLearningOverview: new FakeGetLearningOverview(),
      getNextQuestion: new FakeGetNextQuestion(),
      getUserProfile,
      getUserPreferences: new FakeGetUserPreferences(),
      setLearningPause: new FakeSetLearningPause(),
      submitUserResponse: new FakeSubmitUserResponse(),
      updateUserPreferences: new FakeUpdateUserPreferences(),
      logger: false,
    });
    apps.push(app);

    const response = await app.inject({
      method: "GET",
      url: "/api/users/user_1/profile",
    });

    const body = JSON.parse(response.body) as GetUserProfileResult;

    expect(response.statusCode).toBe(200);
    expect(body.profile.email).toBe("demo@example.com");
    expect(body.profile.preferences.questionsPerWeek).toBe(5);
    expect(getUserProfile.calls).toEqual([{ userId: "user_1" }]);
  });
});
