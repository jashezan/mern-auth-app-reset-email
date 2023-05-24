import nodemailer from "nodemailer";
import MailGen from "mailgen";
import dotenv from "dotenv";
dotenv.config();

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const nodeConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: EMAIL_ADDRESS, // generated ethereal user
    pass: EMAIL_PASSWORD, // generated ethereal password
  },
};

const transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new MailGen({
  theme: "default",
  product: {
    name: "NodeMailer",
    link: "https://mailgen.js/",
  },
});

// POST http://localhost:8000/api/registerMail
/**
 * 
 * @param: {
  "username": "example123",
  "usermail": "",
  "text": "Welcome to NodeMailer! We're very excited to have you on board.",
  "subject": "Welcome to NodeMailer"
}
 */
export const registerMail = async (req, res) => {
  const { username, usermail, text, subject } = req.body;

  // body of the email
  let email = {
    body: {
      name: username,
      intro:
        text ||
        "Welcome to NodeMailer! We're very excited to have you on board.",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  let emailBody = MailGenerator.generate(email);
  let message = {
    from: EMAIL_ADDRESS,
    to: usermail,
    subject: subject || "Welcome to NodeMailer",
    html: emailBody,
  };

  // send mail
  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(200).json({ message: "Email sent successfully", info });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};
