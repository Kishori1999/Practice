import methodOverride from 'method-override';
import { Application } from 'express';

export default (expressApp: Application) => {
  expressApp.use(methodOverride());
};
