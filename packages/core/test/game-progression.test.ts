import { describe, expect, it } from "vitest";
import { applyXpAward, calculateLevelProgress, xpRequiredForLevel } from "../src/index.js";

describe("game progression", () => {
  it("calcula el XP requerido con una curva suave y predecible", () => {
    expect(xpRequiredForLevel(1)).toBe(0);
    expect(xpRequiredForLevel(2)).toBe(120);
    expect(xpRequiredForLevel(3)).toBe(480);
  });

  it("devuelve progreso dentro del nivel actual", () => {
    expect(calculateLevelProgress(240)).toEqual({
      level: 2,
      currentLevelXp: 120,
      nextLevelXp: 480,
      progressRatio: 1 / 3,
    });
  });

  it("aplica XP sin permitir castigos silenciosos", () => {
    const profile = {
      userId: "user_1",
      level: 1,
      totalXp: 0,
      coins: 0,
      constanciaDays: 0,
    };

    expect(
      applyXpAward(profile, {
        userId: "user_1",
        amount: -50,
        reason: "invalid",
        occurredAt: new Date("2026-05-27T12:00:00.000Z"),
      }),
    ).toEqual(profile);
  });
});
