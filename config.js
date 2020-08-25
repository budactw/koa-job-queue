'use strict';

import dotenv from 'dotenv';

const config = dotenv.config({path: './.env'}).parsed;

export default {
  server: {
    port: config.LISTEN_PORT,
  },
};
