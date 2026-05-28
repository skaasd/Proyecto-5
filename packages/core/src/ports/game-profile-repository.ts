import type { GameActivitySnapshot } from "../domain/game-progression.js";

export interface GameProfileRepository {
  getActivitySnapshotByUserId(userId: string): Promise<GameActivitySnapshot>;
}
