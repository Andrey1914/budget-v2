import Brevo from "sib-api-v3-sdk";

// const baseUrl = process.env.NEXTAUTH_URL;

const sendConfirmationEmail = async (
  email: string,
  verificationCode: string
) => {
  const client = Brevo.ApiClient.instance;
  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.BREVO_API_KEY!;
  const SENDER_EMAIL = process.env.BREEVO_SENDER_EMAIL;
  const SENDER_NAME = process.env.BREEVO_SENDER_NAME;

  const emailApi = new Brevo.TransactionalEmailsApi();

  // const confirmUrl = `${baseUrl}/api/confirmEmail/confirm-email?code=${verificationCode}`;

  const sendSmtpEmail = {
    to: [{ email }],
    sender: { email: SENDER_EMAIL, name: SENDER_NAME },
    subject: "Подтвердите вашу почту",
    htmlContent: `
      <p>Ваш код подтверждения: <strong>${verificationCode}</strong></p>
      
    `, //<p>Нажмите <a href="${confirmUrl}">здесь</a>, чтобы подтвердить вашу электронную почту.</p>
  };

  try {
    await emailApi.sendTransacEmail(sendSmtpEmail);
    console.log("Письмо отправлено через Brevo");
  } catch (error) {
    console.error("Ошибка при отправке письма через Brevo:", error);
  }
};

export default sendConfirmationEmail;
