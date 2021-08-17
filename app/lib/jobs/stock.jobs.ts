import Agenda from 'agenda';
import * as Sentry from '@sentry/node';
import app from 'app';
import stockService from '../services/stock.service';

const log = app.createLog(module);

export default (agenda: Agenda) => {
  const jobs = {
    fetchRawStocks: 'fetchRawStocks',
  };

  agenda.define(jobs.fetchRawStocks, { concurrency: 1 }, async () => {
    const name = jobs.fetchRawStocks;
    const transaction = Sentry.startTransaction({ name });
    try {
      log.debug(`job ${name} started`);
      await stockService.fetchRawStocks();
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
