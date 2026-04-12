import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Upmark <noreply@upmark.co>";

export const NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL || "hello@upmark.co";
