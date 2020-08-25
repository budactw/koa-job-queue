'use strict';

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import config from './config.js';

const app = new Koa();
const router = new Router({prefix: '/api'});

app.use(bodyParser());
app.use(async (ctx, next) => {
  ctx.form = ctx.request.body;
  await next();
});

router.post('/telegram/send-message', async (ctx, next) => {
  const {
    message,
  } = ctx.form;

  ctx.body = {
    result: 'ok',
    message: message,
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
