import "server-only";
import type { Attachment } from "nodemailer/lib/mailer";
export interface SendMailParams {
    subject: string;
    to: string;
    text: string;
    html?: string;
    from?: string;
    replyTo?: string;
    attachments?: Attachment[];
}
export declare function sendMail({ to, subject, text, html, from, replyTo, attachments, }: SendMailParams): Promise<void>;
//# sourceMappingURL=sendmail.d.ts.map