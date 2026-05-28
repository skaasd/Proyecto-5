import type { Job } from "bullmq";
import { describe, expect, it } from "vitest";
import {
  type DeliverNextQuestionRunner,
  type SendQuestionJobData,
  buildSendQuestionJob,
} from "../src/jobs/send-question-job.js";

function createJob(data: SendQuestionJobData) {
  const logs: string[] = [];
  const job = {
    data,
    log: async (message: string) => {
      logs.push(message);
      return logs.length;
    },
  } as unknown as Job<SendQuestionJobData>;

  return { job, logs };
}

describe("sendQuestionJob", () => {
  it("entrega la siguiente pregunta y registra el resultado en el job", async () => {
    const executions: SendQuestionJobData[] = [];
    const runner: DeliverNextQuestionRunner = {
      async execute(input) {
        executions.push({
          userId: input.userId,
          scheduledFor: input.scheduledFor.toISOString(),
        });
        return { delivered: true, questionId: "question_1" };
      },
    };
    const { job, logs } = createJob({
      userId: "user_1",
      scheduledFor: "2026-05-27T12:00:00.000Z",
    });

    await buildSendQuestionJob(runner)(job);

    expect(executions).toEqual([
      {
        userId: "user_1",
        scheduledFor: "2026-05-27T12:00:00.000Z",
      },
    ]);
    expect(logs).toEqual(["Delivered question question_1 to user user_1"]);
  });

  it("registra cuando no hay pregunta disponible", async () => {
    const runner: DeliverNextQuestionRunner = {
      async execute() {
        return { delivered: false };
      },
    };
    const { job, logs } = createJob({
      userId: "user_1",
      scheduledFor: "2026-05-27T12:00:00.000Z",
    });

    await buildSendQuestionJob(runner)(job);

    expect(logs).toEqual(["No available question for user user_1"]);
  });

  it("rechaza fechas invalidas", async () => {
    const runner: DeliverNextQuestionRunner = {
      async execute() {
        throw new Error("No deberia ejecutarse");
      },
    };
    const { job } = createJob({
      userId: "user_1",
      scheduledFor: "nope",
    });

    await expect(buildSendQuestionJob(runner)(job)).rejects.toThrow(
      "Invalid scheduledFor value: nope",
    );
  });
});
