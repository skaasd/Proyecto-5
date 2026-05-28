import type {
  EmailService,
  MessagingChannel,
  OutboundMessage,
  UserRepository,
} from "@project-name/core";

export class UserEmailMessagingChannel implements MessagingChannel {
  constructor(
    private readonly users: UserRepository,
    private readonly email: EmailService,
  ) {}

  async send(message: OutboundMessage): Promise<void> {
    const user = await this.users.findById(message.userId);

    if (!user) {
      throw new Error(`Cannot deliver message to missing user ${message.userId}`);
    }

    await this.email.sendEmail({
      to: user.email,
      subject: message.subject ?? "Tu siguiente quest",
      text: message.body,
      html: renderHtml(message.body),
    });
  }
}

function renderHtml(body: string): string {
  return body
    .split("\n")
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
