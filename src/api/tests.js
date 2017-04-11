import { Router } from 'express';

export default ({ config, db }) => {
  let tests = Router();

  tests.get('/', (req, res, next) => {
    res.json({ hede });
  });

  return tests;
}
