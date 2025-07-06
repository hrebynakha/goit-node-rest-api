import nodemailer from "nodemailer";
import { createVerificationTemplate } from "../helpers/templates.js";
import { getHostLink } from "../helpers/hostConfig.js";

const emailConfig = {
  host: process.env.EMAIL_HOST || "smtp.ukr.net",
  port: process.env.EMAIL_PORT || 465,
  secure: process.env.EMAIL_SECURE || true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(emailConfig);

const sendEmail = async (payload) => {
  const email = { ...payload, from: process.env.EMAIL_USER };
  return await transporter.sendMail(email);
};

export const sendVerificationEmail = async ({ to, verificationToken }) => {
  const emailOptions = {
    to,
    subject: "Verification email",
    html: createVerificationTemplate({
      name: to,
      verificationLink: `${getHostLink()}/api/auth/verify/${verificationToken}`,
    }),
  };
  await sendEmail(emailOptions);
};
