import Controlizer from 'controlizer';
import { Application } from 'express';
import { App } from '../domains/app';

const { ExpressTransport } = Controlizer;

export default (
  expressApp: Application,
  app: App,
) => {
  const {
    apiControllers: Controllers,
  } = app;
  const log = app.createLog(module);
  const expressTransport = new ExpressTransport({ app: expressApp });

  const controlizer = new Controlizer({
    transports: [expressTransport],
    // @ts-ignore
    log,
  });

  Controllers.forEach((ControllerClass) => {
    // @ts-ignore
    controlizer.addController(ControllerClass, {
      transports: [expressTransport],
      log,
    });
  });

  app.registerProvider('controlizer', controlizer);
};
