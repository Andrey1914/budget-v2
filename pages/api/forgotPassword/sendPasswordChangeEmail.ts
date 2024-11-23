import Brevo from "sib-api-v3-sdk";

const sendPasswordChangeEmail = async (email: string) => {
  const client = Brevo.ApiClient.instance;
  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.BREVO_API_KEY!;
  const { BREEVO_SENDER_EMAIL, BREEVO_SENDER_NAME } = process.env;
  //   const SENDER_EMAIL = process.env.BREEVO_SENDER_EMAIL;
  //   const SENDER_NAME = process.env.BREEVO_SENDER_NAME;

  const emailApi = new Brevo.TransactionalEmailsApi();

  const sendSmtpEmail = {
    to: [{ email }],
    sender: { email: BREEVO_SENDER_EMAIL, name: BREEVO_SENDER_NAME },
    subject: "Ваш пароль был успешно изменен",
    htmlContent: `
      <h1>Пароль успешно изменен</h1>
      <p>Ваш пароль был успешно обновлен. Если вы не инициировали это действие, пожалуйста, свяжитесь с нашей службой поддержки как можно скорее.</p>
    `,
  };

  try {
    await emailApi.sendTransacEmail(sendSmtpEmail);
    console.log("Уведомление о смене пароля отправлено через Brevo");
  } catch (error) {
    console.error("Ошибка при отправке уведомления через Brevo:", error);
  }
};

export default sendPasswordChangeEmail;
