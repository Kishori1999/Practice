import * as Sentry from '@sentry/node';

import { App } from '../app/domains/app';

export = ({ config: { sentry: { dsn }, environment } }: App) => {
  Sentry.init({
    dsn,
    environment,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
    ],
    tracesSampleRate: 1.0,
  });
};
