import type {
  ExportUserDataResult,
  GetLearningOverviewResult,
  GetNextQuestionResult,
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

  override async execute(): Promise<ExportUserDataResult> {
    throw new Error("not used");
  }
}

class FakeGetNextQuestion extends GetNextQuestion {
  public calls: unknown[] = [];

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

  override async execute(
    input: Parameters<GetNextQuestion["execute"]>[0],
  ): Promise<GetNextQuestionResult> {
    this.calls.push(input);

    return {
      question: {
        id: "question_1",
        prompt: "¿Qué aporta una prueba de humo?",
        type: "multiple_choice",
        concepts: [{ id: "concept_1", name: "Pruebas de humo" }],
        answers: [{ id: "answer_1", text: "Una señal rápida de estabilidad básica." }],
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

describe("GET /api/questions/next", () => {
  const apps: Array<Awaited<ReturnType<typeof buildApp>>> = [];

  afterEach(async () => {
    await Promise.all(apps.map((app) => app.close()));
    apps.length = 0;
  });

  it("valida querystring y delega en GetNextQuestion", async () => {
    const useCase = new FakeGetNextQuestion();
    const app = await buildApp({
      exportUserData: new FakeExportUserData(),
      getLearningOverview: new FakeGetLearningOverview(),
      getNextQuestion: useCase,
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
      url: "/api/questions/next?userId=user_1",
    });

    const body = JSON.parse(response.body) as GetNextQuestionResult;

    expect(response.statusCode).toBe(200);
    expect(body.question?.answers).toEqual([
      { id: "answer_1", text: "Una señal rápida de estabilidad básica." },
    ]);
    expect(useCase.calls).toEqual([{ userId: "user_1" }]);
  });
});
