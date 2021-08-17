import { Agenda } from 'agenda';
import { App } from '../app/domains/app';
import { AppAgenda } from '../app/domains/system';

module.exports = async (app: App) => {
  const { config, createLog } = app;
  const log = createLog(module);
  const agenda = <AppAgenda>(new Agenda(
    { db: { address: config.mongo }, processEvery: config.agenda.processEvery },
  ));

  app.registerProvider('agenda', () => agenda);
  agenda.jobNames = {};

  // we swallow starting in test mode
  if (app.config.isTest) {
    agenda.start = async () => {
      log.info('agenda.start simulation');
      await agenda.cancel({});
    };
  }

  app.jobs.forEach((job) => {
    Object.assign(agenda.jobNames, job(agenda));
  });

  const graceful = async () => {
    await agenda.stop();
    process.exit(0);
  };

  process.on('SIGTERM', graceful);
  process.on('SIGINT', graceful);

  return new Promise((resolve) => {
    agenda.on('ready', () => {
      resolve(agenda);
    });
  });
};
