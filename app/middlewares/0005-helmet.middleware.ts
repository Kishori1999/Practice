import { Application } from 'express';
import helmet from 'helmet';

export default (expressApp: Application) => {
  expressApp.use(helmet());
};
