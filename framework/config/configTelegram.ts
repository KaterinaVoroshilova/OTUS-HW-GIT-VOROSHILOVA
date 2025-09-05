export default Object.freeze({
  enable: process.env.TELEGRAM_ENABLE === 'true',
  token: process.env.TELEGRAM_TOKEN as string,
  chatId: process.env.TELEGRAM_CHAT_ID as string
})