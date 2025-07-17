import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function sendResetEmail(toEmail: string, resetLink: string) {
  try {
    const email = await client.sendgrid.v3.mail.send.post({
      personalizations: [
        {
          to: [{ email: "recipient@example.com" }],
          subject: "Hello from Twilio SendGrid",
        },
      ],
      from: { email: "your-verified-email@yourdomain.com" },
      content: [
        {
          type: "text/plain",
          value: "This is a test email",
        },
      ],
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export default sendResetEmail;
