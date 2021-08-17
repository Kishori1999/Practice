import Agenda from 'agenda';
import * as Sentry from '@sentry/node';
import app from 'app';

const log = app.createLog(module);

export default (agenda: Agenda) => {
  const jobs = {
    cleanUpCompletedJobs: 'cleanUpCompletedJobs',
  };

  agenda.define(jobs.cleanUpCompletedJobs, { concurrency: 1 }, async () => {
    const name = jobs.cleanUpCompletedJobs;
    const transaction = Sentry.startTransaction({ name });
    try {
      log.debug(`job ${name} started`);
      await agenda.cancel({ nextRunAt: null });
      log.debug(`job ${name} completed`);
    } catch (err) {
      log.error(`job ${name} completed with error`);
      log.error(err);
      Sentry.captureException(err);
    } finally {
      transaction.finish();
    }
  });

  return jobs;
};
