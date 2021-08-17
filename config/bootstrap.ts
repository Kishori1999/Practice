import { App } from '../app/domains/app';

const { version } = require('package.json');

const healthService = require('app/lib/services/health.service');

module.exports = async (app: App) => {
  const { config: { agenda: agendaConfig }, agenda } = app;

  healthService.updateData('version', true, version);

  await agenda.every(agendaConfig.cleanUpCompletedJobsEvery, agenda.jobNames.cleanUpCompletedJobs);
  await agenda.every(agendaConfig.fetchRawStocksEvery, agenda.jobNames.fetchRawStocks);
  await agenda.schedule(agendaConfig.scanBlocksSchedule, agenda.jobNames.scanBlocks, {});
  await agenda.start();
};
