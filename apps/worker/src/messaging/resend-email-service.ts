import type { EmailMessage, EmailService } from "@project-name/core";

export type ResendEmailServiceOptions = {
  apiKey: string;
  from: string;
  fetchFn?: typeof fetch;
};

export class ResendEmailService implements EmailService {
  private readonly fetchFn: typeof fetch;

  constructor(private readonly options: ResendEmailServiceOptions) {
    this.fetchFn = options.fetchFn ?? fetch;
  }

  async sendEmail(message: EmailMessage): Promise<void> {
    const response = await this.fetchFn("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.options.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: this.options.from,
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Resend email failed with status ${response.status}: ${await response.text()}`,
      );
    }
  }
}
