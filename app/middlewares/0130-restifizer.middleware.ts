import { Application } from 'express';
import Restifizer from 'restifizer';
import { App } from '../domains/app';

const { ExpressTransport } = Restifizer;

export default (
  expressApp: Application,
  app: App,
) => {
  const {
    restControllers: Controllers,
  } = app;
  const log = app.createLog(module);
  const expressTransport = new ExpressTransport({ app: expressApp });

  const restifizer = new Restifizer({
    transports: [expressTransport],
    // @ts-ignore
    log,
  });

  Controllers.forEach((ControllerClass) => {
    restifizer.addController(ControllerClass);
  });

  app.registerProvider('restifizer', restifizer);
};
