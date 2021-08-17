import bodyParser from 'body-parser';
import { Application } from 'express';

export default (expressApp: Application) => {
  expressApp.use(bodyParser.urlencoded({
    extended: true,
  }));
  expressApp.use(bodyParser.json());
};
