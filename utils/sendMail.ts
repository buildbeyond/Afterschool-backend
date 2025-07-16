import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

async function sendResetEmail(toEmail: string, resetLink: string) {
  const msg = {
    to: toEmail,
    from: "no-reply@yourdomain.com",
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>
           <p>If you didn't request this, you can ignore this message.</p>`,
  };
  await sgMail.send(msg);
}

export default sendResetEmail;
