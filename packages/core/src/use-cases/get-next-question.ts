import type { QuestionWithAnswers } from "../domain/question.js";
import type { QuestionRepository } from "../ports/question-repository.js";
import type { UserRepository } from "../ports/user-repository.js";
import { UseCaseError } from "./errors.js";

export type GetNextQuestionInput = {
  userId: string;
};

export type GetNextQuestionResult = {
  question: {
    id: string;
    prompt: string;
    type: QuestionWithAnswers["type"];
    concepts: Array<{
      id: string;
      name: string;
    }>;
    answers: Array<{
      id: string;
      text: string;
    }>;
  } | null;
};

type Dependencies = {
  users: UserRepository;
  questions: QuestionRepository;
};

export class GetNextQuestion {
  constructor(private readonly dependencies: Dependencies) {}

  async execute(input: GetNextQuestionInput): Promise<GetNextQuestionResult> {
    const user = await this.dependencies.users.findById(input.userId);

    if (!user) {
      throw new UseCaseError("No encontramos ese usuario.", "USER_NOT_FOUND");
    }

    const question = await this.dependencies.questions.findNextForUser(input.userId);

    if (!question) {
      return { question: null };
    }

    return {
      question: {
        id: question.id,
        prompt: question.prompt,
        type: question.type,
        concepts: question.concepts.map((concept) => ({
          id: concept.id,
          name: concept.name,
        })),
        answers: question.answers.map((answer) => ({
          id: answer.id,
          text: answer.text,
        })),
      },
    };
  }
}
