import type { MessagingChannel, OutboundMessage } from "@project-name/core";
import type { Logger } from "pino";

export class LogMessagingChannel implements MessagingChannel {
  constructor(private readonly logger: Logger) {}

  async send(message: OutboundMessage): Promise<void> {
    this.logger.info(
      {
        body: message.body,
        subject: message.subject,
        userId: message.userId,
      },
      "log quest delivery",
    );
  }
}
