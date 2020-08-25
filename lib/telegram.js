'use strict';

import curl from 'superagent';
import superprefix from 'superagent-prefix';
import config from '../config.js';

const prefix = superprefix(`https://api.telegram.org/bot${config.telegram.token}`);

class Telegram {
  /**
   * @returns {Promise<boolean|object>}
   */
  async getMe() {
    const res = (await curl.get('/getMe').use(prefix).timeout({deadline: 30000}))?.body;

    return !res?.ok || !res?.result ? false : res.result;
  }

  /**
   * @param message
   * @returns {Promise<boolean|object>}
   */
  async sendMessage(message) {
    const res = (await curl.post('/sendMessage')
        .use(prefix)
        .timeout({deadline: 30000})
        .send({chat_id: config.telegram.chat_id, text: message}))
        ?.body;

    return !res?.ok || !res?.result ? false : res.result;
  }
}

export { Telegram };
