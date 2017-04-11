import { Router } from 'express';
import https from 'https';

export default ({ config, db }) => {

  let tweets = Router();

  tweets.get('/:q', (req, res, next) => {
    const q = req.params.q;

    const options = {
      host: 'api.twitter.com',
      path: `/1.1/search/tweets.json?q=${q}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.access_token}`
      }
    };

    https.get(options, (response) => {
      const statusCode = response.statusCode;
      const contentType = response.headers['content-type'];

      response.setEncoding('utf8');

      let rawData = '';
      response.on('data', (chunk) => rawData += chunk);
      response.on('end', () => {
        try {
          let parsedData = JSON.parse(rawData);

          let tweets = parsedData.statuses.map((data) => data.text);

          res.json(tweets);
        } catch (e) {
          console.error(e.message);
          res.json(e);
        }
      });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
        res.json(e);
      });
  });

  return tweets;
}
