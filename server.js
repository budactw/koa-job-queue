'use strict';

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import config from './config.js';
import { Telegram } from './lib/telegram.js';

const app = new Koa();
const router = new Router({prefix: '/api'});
const telegram = new Telegram();

app.use(bodyParser());
app.use(async (ctx, next) => {
  ctx.form = ctx.request.body;
  await next();
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      result: 'error',
      message: e.message,
    };
  }
});

router.get('/telegram/get-me', async (ctx, next) => {
  ctx.body = {
    result: 'ok',
    message: await telegram.getMe(),
  };

  await next();
});

router.post('/telegram/send-message', async (ctx, next) => {
  const {
    message,
  } = ctx.form;

  if (message === undefined) {
    throw Error('Invalid message');
  }

  ctx.body = {
    result: 'ok',
    message: await telegram.sendMessage(message),
  };

  await next();
});

app.use(router.routes());

app.use(async (ctx, next) => {
  if (ctx.status === 404) {
    ctx.body = {
      result: 'error',
      message: `No route: ${ctx.request.url}`,
    };
  }

  await next();
});

app.listen(config.server.port, (err, res) => console.log('Server start'));
