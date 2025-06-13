'use strict';

import fastify from 'fastify';
import * as http from './src/http.js';
import { loadApp } from './src/loader.js';

const getLoggerOptions = () => {
  const options = { level: 'info' };
  if (process.stdout.isTTY) {
    options.transport = { target: 'pino-pretty' };
  }
  return options;
};

const init = async () => {
  const server = fastify({ 
    logger: getLoggerOptions(),
  });

  const app = await loadApp();

  http.init(server, app.api);
  http.initStatic(server);
  http.start(server, { port: app.config.server.ports[0] });
};

init();
