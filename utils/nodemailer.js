import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.sendgrid.net",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "apikey",
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

    console.log("[v0] Sending email with from:", mailOptions.from)
    const info = await transporter.sendMail(mailOptions)
    console.log("[v0] Email sent successfully:", info.messageId)
    return info
  } catch (error) {
    console.error("[v0] Error sending email:", error.message)
    throw error
  }
}

export default { sendEmail }
