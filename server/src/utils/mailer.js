import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: process.env.SMTP_USER && process.env.SMTP_PASS ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
});

export const sendOtpMail = async (to, code) => {
  const from = process.env.MAIL_FROM || process.env.SMTP_USER || "no-reply@example.com";
  const html = `<p>Your verification code is <b>${code}</b>. It expires in 10 minutes.</p>`;
  await transporter.sendMail({ from, to, subject: "Your verification code", html });
};

export default async function sendEmail(to, type, payload = {}) {
  const from = process.env.MAIL_FROM || process.env.SMTP_USER || "no-reply@example.com";
  if (type === "otp") {
    const html = `<p>Your verification code is <b>${payload.otp}</b>. It expires in ${payload.minutes || 10} minutes.</p>`;
    await transporter.sendMail({ from, to, subject: "Your verification code", html });
    return;
  }
  const html = `<p>${payload.message || "Notification"}</p>`;
  await transporter.sendMail({ from, to, subject: payload.subject || "Notification", html });
}