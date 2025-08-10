import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMail = async ({ to, subject, html, attachments = [] }) => {
  return transporter.sendMail({
    from: `"Marshee" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    attachments,
  });
};
