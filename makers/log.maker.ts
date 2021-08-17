import { App } from '../app/domains/app';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createLogFactory = (app: App) => (module: NodeModule): Console => console;

export = (app: App) => {
  const logFactory = createLogFactory(app);
  app.registerProvider('createLog', () => logFactory);
};
