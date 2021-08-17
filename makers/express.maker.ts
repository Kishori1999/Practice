import http from 'http';
import express, { Application } from 'express';

import { App } from '../app/domains/app';

export default (app: App) => {
  const expressApp = express();
  expressApp.enable('trust proxy');
  const server = http.createServer(expressApp);
  app.middlewares.forEach((middleware) => middleware(expressApp, app));
  app.registerProvider<Application>('expressApp', expressApp);
  app.registerProvider('httpServer', server);
};
