import express, { Application } from 'express';

export default (expressApp: Application) => {
  expressApp.use('/apidocs', express.static('apidocs'));
};
