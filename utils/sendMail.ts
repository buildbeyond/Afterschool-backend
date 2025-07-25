import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string); // store API key securely

const sendResetPasswordEmail = async (
  toEmail: string,
  resetLink: string
): Promise<void> => {
  const msg = {
    to: toEmail,
    from: process.env.SENDGRID_SENDER as string, // This must be verified in your SendGrid account
    subject: "Reset your password",
    html: `
      <h2>Password Reset Requested</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 1 hour.</p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`Reset password email sent to ${toEmail}`);
  } catch (error: any) {
    console.error("Error sending email:", error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

export default sendResetPasswordEmail;
