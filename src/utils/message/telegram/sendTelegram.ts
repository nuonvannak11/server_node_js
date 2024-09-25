import axios, { AxiosError } from 'axios';

async function sendTelegram() {
  const botToken = "6439993192:AAFoWK6d5u2-7lgFFVTGTsUd2wIN7ko45RI";
  const chatId = "#";
  const messageText = "Hey Bro What ta fuck.";

  const sendMessageUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await axios.post(sendMessageUrl, {
      chat_id: chatId,
      text: messageText,
    });

    if (response.status !== 200) {
      console.error("Failed to send message:", response.statusText);
    }
  } catch (error) {
    const axiosError = error as AxiosError;

    console.error("Error sending message:", axiosError.message);
  }
}
export { sendTelegram };
