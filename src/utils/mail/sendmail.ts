import "server-only";
import type { Attachment } from "nodemailer/lib/mailer";

import nodemailer from "nodemailer";

const { MAILUSER, MAILPASS, MAILHOST, MAILPORT } = process.env;

if (!MAILUSER || !MAILPASS || !MAILHOST || !MAILPORT) {
  throw new Error("Missing required mail environment variables");
}

const transporter = nodemailer.createTransport({
  host: MAILHOST,
  port: Number(MAILPORT),
  secure: Number(MAILPORT) === 465,
  auth: {
    user: MAILUSER,
    pass: MAILPASS,
  },
});

export interface SendMailParams {
  subject: string;
  to: string;
  text: string;
  html?: string;
  from?: string;
  replyTo?: string;
  attachments?: Attachment[];
}

export async function sendMail({
  to,
  subject,
  text,
  html,
  from = MAILUSER,
  replyTo,
  attachments,
}: SendMailParams): Promise<void> {
  await transporter.sendMail({
    to,
    from,
    replyTo,
    subject,
    text,
    html,
    attachments,
  });
}
