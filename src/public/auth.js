import { Router } from 'express';

export default ({ config, db }) => {
  let auth = Router();

  auth.get('/', (req, res) => {
    res.render('signin');
  });

  auth.get('/welcome', (req, res) => {
    res.render('welcome');
  });

  return auth;
}
