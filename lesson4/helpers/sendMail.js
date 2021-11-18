import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_LOGIN, // generated ethereal user
    pass: process.env.MAIL_PASSWORD, // generated ethereal password
  },
});

export const sendMail = async (params) => {
  const { to, subject, text, html } = params;
  const result = await transporter.sendMail({
    from: '"Serjo 👻" <89811810024@mail.ru>',
    to,
    subject,
    text,
    html, // html body
  });

  return result;
}