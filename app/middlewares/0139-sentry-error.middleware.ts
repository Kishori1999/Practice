import { Application } from 'express';
import * as Sentry from '@sentry/node';

export default (expressApp: Application) => {
  expressApp.use(Sentry.Handlers.errorHandler());
};
