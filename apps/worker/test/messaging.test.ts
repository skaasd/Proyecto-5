import type { EmailMessage, EmailService, UserRepository } from "@project-name/core";
import { describe, expect, it } from "vitest";
import { ResendEmailService } from "../src/messaging/resend-email-service.js";
import { UserEmailMessagingChannel } from "../src/messaging/user-email-messaging-channel.js";

class InMemoryUsers implements UserRepository {
  async findById(id: string) {
    return id === "user_1"
      ? {
          id,
          email: "user@example.com",
          createdAt: new Date("2026-05-27T12:00:00.000Z"),
          updatedAt: new Date("2026-05-27T12:00:00.000Z"),
        }
      : null;
  }
}

class InMemoryEmail implements EmailService {
  public messages: EmailMessage[] = [];

  async sendEmail(message: EmailMessage): Promise<void> {
    this.messages.push(message);
  }
}

describe("UserEmailMessagingChannel", () => {
  it("resuelve el email del usuario y envia la quest", async () => {
    const email = new InMemoryEmail();
    const channel = new UserEmailMessagingChannel(new InMemoryUsers(), email);

    await channel.send({
      userId: "user_1",
      subject: "Quest",
      body: "Primera linea\n\n<script>",
    });

    expect(email.messages).toEqual([
      {
        to: "user@example.com",
        subject: "Quest",
        text: "Primera linea\n\n<script>",
        html: "<p>Primera linea</p><p></p><p>&lt;script&gt;</p>",
      },
    ]);
  });

  it("falla si el usuario no existe", async () => {
    const channel = new UserEmailMessagingChannel(new InMemoryUsers(), new InMemoryEmail());

    await expect(channel.send({ userId: "missing", body: "Hola" })).rejects.toThrow(
      "Cannot deliver message to missing user missing",
    );
  });
});

describe("ResendEmailService", () => {
  it("llama a la API de Resend con el payload esperado", async () => {
    const calls: unknown[] = [];
    const service = new ResendEmailService({
      apiKey: "secret",
      from: "aprendizaje@example.com",
      fetchFn: async (...args) => {
        calls.push(args);
        return new Response("{}", { status: 200 });
      },
    });

    await service.sendEmail({
      to: "user@example.com",
      subject: "Quest",
      text: "Texto",
      html: "<p>Texto</p>",
    });

    expect(calls).toEqual([
      [
        "https://api.resend.com/emails",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer secret",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "aprendizaje@example.com",
            to: "user@example.com",
            subject: "Quest",
            html: "<p>Texto</p>",
            text: "Texto",
          }),
        },
      ],
    ]);
  });
});
