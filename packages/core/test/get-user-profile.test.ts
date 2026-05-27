import { describe, expect, it } from "vitest";
import { GetUserProfile } from "../src/use-cases/get-user-profile.js";

const createdAt = new Date("2026-05-27T10:00:00.000Z");
const updatedAt = new Date("2026-05-27T11:00:00.000Z");

describe("GetUserProfile", () => {
  it("devuelve identidad básica y preferencias del usuario", async () => {
    const useCase = new GetUserProfile({
      users: {
        findById: async (id) => ({
          id,
          email: "demo@example.com",
          createdAt,
          updatedAt,
        }),
      },
      preferences: {
        getByUserId: async (userId) => ({
          userId,
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

    await expect(useCase.execute({ userId: "user_1" })).resolves.toEqual({
      profile: {
        id: "user_1",
        email: "demo@example.com",
        createdAt: "2026-05-27T10:00:00.000Z",
        updatedAt: "2026-05-27T11:00:00.000Z",
        preferences: {
          questionsPerWeek: 5,
          tipsPerWeek: 2,
          isPaused: false,
        },
      },
    });
  });

  it("falla si el usuario no existe", async () => {
    const useCase = new GetUserProfile({
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

    await expect(useCase.execute({ userId: "missing" })).rejects.toMatchObject({
      code: "USER_NOT_FOUND",
    });
  });
});
