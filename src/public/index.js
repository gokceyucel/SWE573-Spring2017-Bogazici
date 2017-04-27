import { Router } from 'express';
import auth from './auth';

export default ({ config, db }) => {
  let app = Router();

  app.get('/', (req, res) => {
    res.json({ message: 'welcome to app' });
  });

  app.use('/auth', auth({ config, db }));

  return app;
}
