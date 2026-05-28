import { describe, expect, it } from "vitest";
import { scheduleNextReview } from "../src/index.js";

describe("scheduleNextReview", () => {
  const reviewedAt = new Date("2026-05-27T12:00:00.000Z");

  it("agenda una primera respuesta correcta con estabilidad inicial", () => {
    const result = scheduleNextReview({ reviewedAt, isCorrect: true });

    expect(result).toEqual({
      stability: 2.5,
      difficulty: 4.65,
      reviewCount: 1,
      nextReviewAt: new Date("2026-05-30T12:00:00.000Z"),
    });
  });

  it("aumenta intervalo cuando hay memoria previa y acierto", () => {
    const result = scheduleNextReview({
      reviewedAt,
      isCorrect: true,
      previousState: {
        stability: 3,
        difficulty: 4,
        reviewCount: 2,
      },
    });

    expect(result.reviewCount).toBe(3);
    expect(result.difficulty).toBe(3.65);
    expect(result.stability).toBeCloseTo(5.52);
    expect(result.nextReviewAt).toEqual(new Date("2026-06-02T12:00:00.000Z"));
  });

  it("acorta intervalo y sube dificultad cuando hay error", () => {
    const result = scheduleNextReview({
      reviewedAt,
      isCorrect: false,
      previousState: {
        stability: 4,
        difficulty: 5,
        reviewCount: 3,
      },
    });

    expect(result).toEqual({
      stability: 1.8,
      difficulty: 5.8,
      reviewCount: 4,
      nextReviewAt: new Date("2026-05-28T12:00:00.000Z"),
    });
  });
});
