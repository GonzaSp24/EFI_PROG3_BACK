import nodemailer from "nodemailer"

// Create reusable transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

/**
* Send email using nodemailer
* @param {Object} options - Email options
* @param {string} options.to - Recipient email address
* @param {string} options.subject - Email subject
* @param {string} options.html - HTML content of the email
* @param {string} [options.from] - Sender email (optional, uses default)
* @returns {Promise} - Nodemailer send result
*/
export const sendEmail = async ({ to, subject, html, from }) => {
    try {
        const mailOptions = {
            from: from || process.env.SMTP_FROM || process.env.SMTP_USER,
            to,
            subject,
            html,
        }
        
        const info = await transporter.sendMail(mailOptions)
        console.log("Email sent successfully:", info.messageId)
        return info
    } catch (error) {
        console.error("Error sending email:", error)
        throw error
    }
}

export default sendEmail