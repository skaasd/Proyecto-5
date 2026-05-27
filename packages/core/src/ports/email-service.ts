export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export interface EmailService {
  sendEmail(message: EmailMessage): Promise<void>;
}
