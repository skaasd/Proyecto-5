import type { LearningEvent } from "../domain/learning-event.js";

export interface LearningEventRepository {
  append(event: LearningEvent): Promise<void>;
}
