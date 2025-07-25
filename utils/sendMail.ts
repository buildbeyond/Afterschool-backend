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
    subject: "パスワードをリセットしてください",
    html: `
      <h2>パスワード再設定のリクエストを受け付けました</h2>
      <p>以下のリンクをクリックして、パスワードを再設定してください。</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>このリンクの有効期限は1時間です。</p>
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
