'use strict';

import dotenv from 'dotenv';

const config = dotenv.config({path: './.env'}).parsed;

export default {
  server: {
    port: config.LISTEN_PORT,
  },
  telegram: {
    token: config.TELEGRAM_BOT_TOKEN,
    chat_id: config.TELEGRAM_CHAT_ID,
  },
};
