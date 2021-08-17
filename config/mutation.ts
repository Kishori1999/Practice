/**
 * Created by vedi on 22/02/2017.
 */

export = {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  resolver: (file: string) => require(file),
  baseFolder: './app',
  configs: [
    '../config.local.json', '../config.local.?s',
    `../config/env/${(<any>global).FORCED_NODE_ENV || process.env.NODE_ENV}.?s`,
    '../config/env/all.?s',
    '**/config/*/.?s',
  ],
  phases: [
    {
      sources: [],
      makers: [
        '../makers/log.maker.?s',
        '../makers/sentry.maker.?s',
      ],
    },
    {
      sources: [
        { name: 'consts', path: ['lib/consts.?s', '**/consts/*.?s'], merge: true },
        { name: 'models', path: '**/models/*.model.?s' },
      ],
      makers: [
        '../makers/mongoose.maker.?s',
      ],
    },
    {
      sources: [
        { name: 'apiControllers', path: '**/controllers/api/*.controller.?s' },
        { name: 'restControllers', path: '**/controllers/rest/*.controller.?s' },
      ],
      makers: [
        '**/services/*.service.?s',
      ],
    },
    {
      sources: [
        { name: 'middlewares', path: '**/middlewares/*.middleware.?s' },
      ],
      makers: [
        '../makers/express.maker.?s',
      ],
    },
    {
      sources: [
        { name: 'jobs', path: '**/jobs/*.jobs.?s' },
      ],
      makers: [
        '../makers/agenda.maker.?s',
      ],
    },
  ],
};
