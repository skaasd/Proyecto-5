import { describe, expect, it } from "vitest";
import type { GameActivitySnapshot, GameProfileRepository, UserRepository } from "../src/index.js";
import { GetGameProfile, UseCaseError } from "../src/index.js";

class InMemoryUsers implements UserRepository {
  constructor(private readonly userIds: string[]) {}

  async findById(id: string) {
    return this.userIds.includes(id)
      ? {
          id,
          email: `${id}@example.com`,
          createdAt: new Date("2026-05-27T12:00:00.000Z"),
          updatedAt: new Date("2026-05-27T12:00:00.000Z"),
        }
      : null;
  }
}

class InMemoryGameProfiles implements GameProfileRepository {
  constructor(private readonly snapshot: GameActivitySnapshot) {}

  async getActivitySnapshotByUserId(): Promise<GameActivitySnapshot> {
    return this.snapshot;
  }
}

describe("GetGameProfile", () => {
  it("calcula nivel, monedas e insignias desde actividad real", async () => {
    const useCase = new GetGameProfile({
      users: new InMemoryUsers(["user_1"]),
      gameProfiles: new InMemoryGameProfiles({
        userId: "user_1",
        totalResponses: 8,
        correctResponses: 6,
        conceptsExplored: 7,
        activeDays: 3,
        concepts: [
          { id: "concept_1", name: "Pruebas de humo", responseCount: 4, correctCount: 4 },
          { id: "concept_2", name: "Riesgo de producto", responseCount: 2, correctCount: 1 },
        ],
      }),
    });

    const result = await useCase.execute({ userId: "user_1" });

    expect(result.gameProfile).toMatchObject({
      userId: "user_1",
      totalXp: 335,
      coins: 68,
      constanciaDays: 3,
      level: 2,
      currentLevelXp: 120,
      nextLevelXp: 480,
    });
    expect(result.gameProfile.skillNodes).toEqual([
      { label: "Pruebas de humo", level: "Nivel 4", state: "mastered" },
      { label: "Riesgo de producto", level: "Nivel 2", state: "active" },
    ]);
    expect(result.gameProfile.badges).toEqual([
      { title: "Primer movimiento", rarity: "common", isLocked: false },
      { title: "Senal confiable", rarity: "rare", isLocked: false },
      { title: "Cartografo QA", rarity: "epic", isLocked: false },
      { title: "Constancia inicial", rarity: "rare", isLocked: false },
    ]);
  });

  it("rechaza usuarios inexistentes", async () => {
    const useCase = new GetGameProfile({
      users: new InMemoryUsers([]),
      gameProfiles: new InMemoryGameProfiles({
        userId: "missing",
        totalResponses: 0,
        correctResponses: 0,
        conceptsExplored: 0,
        activeDays: 0,
        concepts: [],
      }),
    });

    await expect(useCase.execute({ userId: "missing" })).rejects.toEqual(
      new UseCaseError("No encontramos ese usuario.", "USER_NOT_FOUND"),
    );
  });
});
