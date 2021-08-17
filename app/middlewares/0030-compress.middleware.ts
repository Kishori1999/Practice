import compress from 'compression';
import { Application } from 'express';

export default (expressApp: Application) => {
  expressApp.use(compress());
};
