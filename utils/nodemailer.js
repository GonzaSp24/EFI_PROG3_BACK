import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const sendEmail = async ({ to, subject, html, from }) => {
  try {
    const mailOptions = {
      from: from || process.env.MAIL_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
    }

    console.log("Sending email with from:", mailOptions.from)
    const info = await transporter.sendMail(mailOptions)
    console.log("Email sent successfully:", info.messageId)
    return info
  } catch (error) {
    console.error("Error sending email:", error.message)
    throw error
  }
}

export default { sendEmail }
