import Agenda from 'agenda';
import * as Sentry from '@sentry/node';
import app from 'app';
import allocateOrderService from '../services/allocateOrder.service';

const log = app.createLog(module);

export default (agenda: Agenda) => {
  const jobs = {
    createAssets: 'createAssets',
    fetchSecondDiceRoll: 'fetchSecondDiceRoll',
    generateSerialNumber: 'generateSerialNumber',
    scanBlocks: 'scanBlocks',
  };

  agenda.define(jobs.scanBlocks, { concurrency: 1 }, async () => {
    const name = jobs.scanBlocks;
    const transaction = Sentry.startTransaction({ name });
    let allDone: boolean | undefined;
    try {
      log.debug(`job ${name} started`);
      allDone = await allocateOrderService.scanBlocks();
      log.debug(`job ${name} completed`);
    } catch (err) {
      log.error(`job ${name} completed with error`);
      log.error(err);
      Sentry.captureException(err);
      allDone = true;
    } finally {
      transaction.finish();
      await agenda.schedule(allDone ? app.config.agenda.scanBlocksSchedule : 'now', name, {});
    }
  });

  agenda.define(jobs.fetchSecondDiceRoll, { concurrency: 20 }, async (job) => {
    const name = jobs.fetchSecondDiceRoll;
    const { data: { blockNumber, transactionHash, firstDiceRoll } } = job.attrs;
    const transaction = Sentry.startTransaction({ name });
    try {
      log.debug(`job ${name} started`);
      await allocateOrderService.fetchSecondDiceRoll(blockNumber, transactionHash, firstDiceRoll);
      log.debug(`job ${name} completed`);
    } catch (err) {
      log.error(`job ${name} completed with error`);
      log.error(err);
      Sentry.captureException(err);
      throw err;
    } finally {
      transaction.finish();
    }
  });

  agenda.define(jobs.createAssets, { concurrency: 20 }, async (job) => {
    const name = jobs.createAssets;
    const { data: { transactionHash } } = job.attrs;
    const transaction = Sentry.startTransaction({ name });
    try {
      log.debug(`job ${name} started`);
      await allocateOrderService.createAssets(transactionHash);
      log.debug(`job ${name} completed`);
    } catch (err) {
      log.error(`job ${name} completed with error`);
      log.error(err);
      Sentry.captureException(err);
      throw err;
    } finally {
      transaction.finish();
    }
  });

  agenda.define(jobs.generateSerialNumber, { concurrency: 20 }, async (job) => {
    const name = jobs.generateSerialNumber;
    const { data: { transactionHash, indexInOrder, secondDiceRoll } } = job.attrs;
    const transaction = Sentry.startTransaction({ name });
    try {
      log.debug(`job ${name} started`);
      await allocateOrderService.generateAndSetSerialNumber(
        transactionHash,
        indexInOrder,
        secondDiceRoll,
      );
      log.debug(`job ${name} completed`);
    } catch (err) {
      log.error(`job ${name} completed with error`);
      log.error(err);
      Sentry.captureException(err);
      throw err;
    } finally {
      transaction.finish();
    }
  });

  return jobs;
};
