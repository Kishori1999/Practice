import { Application } from 'express';
import { App } from '../domains/app';

export default (expressApp: Application, app: App) => {
  if (process.env.NODE_ENV !== 'production') {
    expressApp.post('/jobs/:name', async (req, res) => {
      const { name } = req.params;
      // @ts-ignore
      const jobDefinition = app.agenda._definitions[name];

      if (!jobDefinition) {
        return res.status(404).send({ message: 'no such job' });
      }

      const job = app.agenda.create(name, req.body);

      try {
        await jobDefinition.fn(job);
        return res.status(200).send({ status: true });
      } catch (err) {
        return res.status(400).send({ error: err.message });
      }
    });
  }
};
