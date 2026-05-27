export type OutboundMessage = {
  userId: string;
  subject?: string;
  body: string;
};

export interface MessagingChannel {
  send(message: OutboundMessage): Promise<void>;
}
