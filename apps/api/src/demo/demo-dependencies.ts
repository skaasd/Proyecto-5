import type {
  GameActivitySnapshot,
  GameProfileRepository,
  LearningEvent,
  LearningEventRepository,
  LearningOverview,
  LearningOverviewRepository,
  QuestionRepository,
  QuestionWithAnswers,
  RecordReviewInput,
  SaveUserResponseInput,
  SetPauseInput,
  SpacedRepetitionScheduler,
  UpdateLearningCadenceInput,
  User,
  UserDataExportRepository,
  UserLearningPreferences,
  UserPreferencesRepository,
  UserRepository,
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
  scheduleNextReview,
} from "@project-name/core";
import { conceptBank, questionBank } from "@project-name/shared";

const now = new Date("2026-05-27T12:00:00.000Z");

const demoUser: User = {
  id: "user_demo",
  email: "demo@example.com",
  createdAt: now,
  updatedAt: now,
};

const legacyDemoQuestions: QuestionWithAnswers[] = [
  {
    id: "question_qa_regression_purpose",
    prompt:
      "Después de corregir un bug en el login, el equipo quiere revisar que el cambio no haya roto flujos que antes funcionaban. ¿Qué tipo de prueba describe mejor esa intención?",
    type: "multiple_choice",
    conceptIds: ["concept_regresion", "concept_cobertura"],
    concepts: [
      { id: "concept_regresion", name: "Pruebas de regresión", subtopicId: "subtopic_qa" },
      { id: "concept_cobertura", name: "Cobertura de pruebas", subtopicId: "subtopic_qa" },
    ],
    answers: [
      {
        id: "answer_qa_regression_correct",
        questionId: "question_qa_regression_purpose",
        text: "Prueba de regresión",
        isCorrect: true,
        explanation:
          "Las pruebas de regresión ayudan a revisar que cambios nuevos no rompan flujos previos.",
      },
      {
        id: "answer_qa_regression_smoke",
        questionId: "question_qa_regression_purpose",
        text: "Prueba de humo",
        isCorrect: false,
        explanation:
          "Una prueba de humo da una señal rápida de estabilidad, pero aquí el foco es impacto por cambio.",
      },
      {
        id: "answer_qa_regression_load",
        questionId: "question_qa_regression_purpose",
        text: "Prueba de carga",
        isCorrect: false,
        explanation:
          "La prueba de carga observa comportamiento bajo volumen; no es el objetivo central del caso.",
      },
    ],
  },
  {
    id: "question_qa_smoke_release",
    prompt:
      "Antes de invertir horas en una suite completa, quieres saber si la nueva build al menos permite iniciar sesión, navegar y crear un registro básico. ¿Qué enfoque calza mejor?",
    type: "multiple_choice",
    conceptIds: ["concept_humo"],
    concepts: [{ id: "concept_humo", name: "Pruebas de humo", subtopicId: "subtopic_qa" }],
    answers: [
      {
        id: "answer_qa_smoke_correct",
        questionId: "question_qa_smoke_release",
        text: "Ejecutar una prueba de humo",
        isCorrect: true,
        explanation:
          "Es una revisión breve de flujos críticos antes de entrar en pruebas más detalladas.",
      },
      {
        id: "answer_qa_smoke_exploratory",
        questionId: "question_qa_smoke_release",
        text: "Hacer solo pruebas exploratorias largas",
        isCorrect: false,
        explanation: "La exploración aporta, pero aquí se busca una señal rápida y acotada.",
      },
    ],
  },
];

const conceptBySlug = new Map(conceptBank.map((concept) => [concept.slug, concept]));
const demoQuestions: QuestionWithAnswers[] = questionBank.map((question) => ({
  id: question.id,
  prompt: question.prompt,
  type: "multiple_choice",
  conceptIds: question.conceptSlugs.map((slug) => conceptId(slug)),
  concepts: question.conceptSlugs.map((slug) => ({
    id: conceptId(slug),
    name: conceptBySlug.get(slug)?.name ?? slug,
    subtopicId: "subtopic_qa",
  })),
  answers: [
    {
      id: `${question.id}_answer_correct`,
      questionId: question.id,
      text: question.correct,
      isCorrect: true,
      explanation: `Correcto. ${question.explanation}`,
    },
    ...question.distractors.map((answer, index) => ({
      id: `${question.id}_answer_distractor_${index + 1}`,
      questionId: question.id,
      text: answer,
      isCorrect: false,
      explanation: `No es el mejor foco para este escenario. ${question.explanation}`,
    })),
  ],
}));

function conceptId(slug: string): string {
  return `concept_${slug}`;
}

type DemoStore = {
  responses: SaveUserResponseInput[];
  events: LearningEvent[];
  reviews: RecordReviewInput[];
  preferences: UserLearningPreferences;
};

class DemoUsers implements UserRepository {
  async findById(id: string): Promise<User | null> {
    return id === demoUser.id ? demoUser : null;
  }
}

class DemoQuestions implements QuestionRepository {
  constructor(private readonly store: DemoStore) {}

  async findByIdWithAnswers(id: string): Promise<QuestionWithAnswers | null> {
    return demoQuestions.find((question) => question.id === id) ?? null;
  }

  async findNextForUser(userId: string): Promise<QuestionWithAnswers | null> {
    return (
      demoQuestions.find(
        (question) =>
          !this.store.responses.some(
            (response) => response.userId === userId && response.questionId === question.id,
          ),
      ) ??
      demoQuestions[0] ??
      null
    );
  }

  async saveUserResponse(input: SaveUserResponseInput): Promise<UserResponse> {
    this.store.responses.push(input);

    return {
      id: `response_demo_${this.store.responses.length}`,
      ...input,
    };
  }
}

class DemoEvents implements LearningEventRepository {
  constructor(private readonly store: DemoStore) {}

  async append(event: LearningEvent): Promise<void> {
    this.store.events.push(event);
  }
}

class DemoScheduler implements SpacedRepetitionScheduler {
  constructor(private readonly store: DemoStore) {}

  async recordReview(input: RecordReviewInput): Promise<void> {
    this.store.reviews.push(input);
  }
}

class DemoOverview implements LearningOverviewRepository {
  constructor(private readonly store: DemoStore) {}

  async getByUserId(userId: string): Promise<LearningOverview> {
    const responses = this.store.responses.filter((response) => response.userId === userId);
    const conceptIds = new Set<string>();

    for (const response of responses) {
      const question = demoQuestions.find((candidate) => candidate.id === response.questionId);
      for (const conceptId of question?.conceptIds ?? []) {
        conceptIds.add(conceptId);
      }
    }

    const nextReviewAt = this.store.reviews
      .filter((review) => review.userId === userId)
      .map(
        (review) =>
          scheduleNextReview({
            reviewedAt: review.reviewedAt,
            isCorrect: review.isCorrect,
          }).nextReviewAt,
      )
      .sort((left, right) => left.getTime() - right.getTime())[0];

    return {
      userId,
      totalResponses: responses.length,
      correctResponses: responses.filter((response) => response.isCorrect).length,
      conceptsExplored: conceptIds.size,
      totalTimeMs: responses.reduce((total, response) => total + response.responseTimeMs, 0),
      lastActivityAt: responses.at(-1)?.submittedAt,
      nextReviewAt,
      recentResponses: responses
        .slice(-5)
        .reverse()
        .map((response, index) => {
          const question = demoQuestions.find((candidate) => candidate.id === response.questionId);
          const answer = question?.answers.find((candidate) => candidate.id === response.answerId);

          return {
            id: `response_demo_${responses.length - index}`,
            questionId: response.questionId,
            questionPrompt: question?.prompt ?? "Pregunta demo",
            answerText: answer?.text,
            isCorrect: response.isCorrect,
            submittedAt: response.submittedAt,
          };
        }),
    };
  }
}

class DemoGameProfiles implements GameProfileRepository {
  constructor(private readonly store: DemoStore) {}

  async getActivitySnapshotByUserId(userId: string): Promise<GameActivitySnapshot> {
    const responses = this.store.responses.filter((response) => response.userId === userId);
    const conceptIds = new Set<string>();
    const concepts = new Map<
      string,
      { id: string; name: string; responseCount: number; correctCount: number }
    >();
    const activeDates = new Set<string>();

    for (const response of responses) {
      activeDates.add(response.submittedAt.toISOString().slice(0, 10));

      const question = demoQuestions.find((candidate) => candidate.id === response.questionId);
      for (const conceptId of question?.conceptIds ?? []) {
        conceptIds.add(conceptId);
        const concept = question?.concepts.find((candidate) => candidate.id === conceptId);
        const current = concepts.get(conceptId) ?? {
          id: conceptId,
          name: concept?.name ?? "Concepto demo",
          responseCount: 0,
          correctCount: 0,
        };

        concepts.set(conceptId, {
          ...current,
          responseCount: current.responseCount + 1,
          correctCount: current.correctCount + (response.isCorrect ? 1 : 0),
        });
      }
    }

    return {
      userId,
      totalResponses: responses.length,
      correctResponses: responses.filter((response) => response.isCorrect).length,
      conceptsExplored: conceptIds.size,
      activeDays: activeDates.size,
      concepts: Array.from(concepts.values()),
    };
  }
}

class DemoPreferences implements UserPreferencesRepository {
  constructor(private readonly store: DemoStore) {}

  async getByUserId(): Promise<UserLearningPreferences> {
    return this.store.preferences;
  }

  async setPause(input: SetPauseInput): Promise<UserLearningPreferences> {
    this.store.preferences = {
      ...this.store.preferences,
      isPaused: input.isPaused,
      pausedUntil: input.pausedUntil,
    };

    return this.store.preferences;
  }

  async updateCadence(input: UpdateLearningCadenceInput): Promise<UserLearningPreferences> {
    this.store.preferences = {
      ...this.store.preferences,
      questionsPerWeek: input.questionsPerWeek,
      tipsPerWeek: input.tipsPerWeek,
    };

    return this.store.preferences;
  }
}

class DemoDataExport implements UserDataExportRepository {
  constructor(private readonly store: DemoStore) {}

  async exportByUserId(userId: string, exportedAt: Date) {
    const responses = this.store.responses.filter((response) => response.userId === userId);

    return {
      exportedAt,
      user: {
        id: demoUser.id,
        email: demoUser.email,
        createdAt: demoUser.createdAt,
      },
      preferences: {
        questionsPerWeek: this.store.preferences.questionsPerWeek,
        tipsPerWeek: this.store.preferences.tipsPerWeek,
        isPaused: this.store.preferences.isPaused,
        pausedUntil: this.store.preferences.pausedUntil,
      },
      responses: responses.map((response, index) => {
        const question = demoQuestions.find((candidate) => candidate.id === response.questionId);
        const answer = question?.answers.find((candidate) => candidate.id === response.answerId);

        return {
          id: `response_demo_${index + 1}`,
          questionId: response.questionId,
          questionPrompt: question?.prompt ?? "Pregunta demo",
          answerId: response.answerId,
          answerText: answer?.text,
          isCorrect: response.isCorrect,
          responseTimeMs: response.responseTimeMs,
          submittedAt: response.submittedAt,
        };
      }),
      learningEvents: this.store.events
        .filter((event) => event.userId === userId)
        .map((event, index) => ({
          id: `event_demo_${index + 1}`,
          type: event.kind,
          occurredAt: event.occurredAt,
          payload: event.payload,
        })),
      spacedRepetitionStates: this.store.reviews
        .filter((review) => review.userId === userId)
        .flatMap((review) =>
          review.conceptIds.map((conceptId) => {
            const concept = demoQuestions
              .flatMap((question) => question.concepts)
              .find((candidate) => candidate.id === conceptId);
            const next = scheduleNextReview({
              reviewedAt: review.reviewedAt,
              isCorrect: review.isCorrect,
            });

            return {
              conceptId,
              conceptName: concept?.name ?? "Concepto demo",
              stability: next.stability,
              difficulty: next.difficulty,
              reviewCount: next.reviewCount,
              lastReviewedAt: review.reviewedAt,
              nextReviewAt: next.nextReviewAt,
            };
          }),
        ),
    };
  }
}

export function buildDemoUseCases() {
  const store: DemoStore = {
    responses: [],
    events: [],
    reviews: [],
    preferences: {
      userId: demoUser.id,
      questionsPerWeek: 5,
      tipsPerWeek: 2,
      isPaused: false,
    },
  };
  const users = new DemoUsers();
  const questions = new DemoQuestions(store);
  const preferences = new DemoPreferences(store);

  return {
    exportUserData: new ExportUserData({
      users,
      exports: new DemoDataExport(store),
      now: () => new Date(),
    }),
    getLearningOverview: new GetLearningOverview({
      users,
      overview: new DemoOverview(store),
    }),
    getGameProfile: new GetGameProfile({
      users,
      gameProfiles: new DemoGameProfiles(store),
    }),
    getUserProfile: new GetUserProfile({
      users,
      preferences,
    }),
    getUserPreferences: new GetUserPreferences({
      users,
      preferences,
    }),
    setLearningPause: new SetLearningPause({
      users,
      preferences,
    }),
    updateUserPreferences: new UpdateUserPreferences({
      users,
      preferences,
    }),
    getNextQuestion: new GetNextQuestion({
      users,
      questions,
    }),
    submitUserResponse: new SubmitUserResponse({
      users,
      questions,
      events: new DemoEvents(store),
      scheduler: new DemoScheduler(store),
      now: () => new Date(),
    }),
  };
}
