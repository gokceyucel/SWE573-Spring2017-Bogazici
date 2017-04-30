import { Router } from 'express';
import https from 'https';

export default ({ config, db }) => {

  let tweets = Router();

  tweets.get('/:q/:latLong', (req, res, next) => {
    const q = req.params.q;
    const latLong = req.params.latLong;

    const options = {
      host: 'api.twitter.com',
      // path: `/1.1/search/tweets.json?q=${q}`,
      // path: `/1.1/search/tweets.json?q=${q}&geocode=41.085560799999996,29.044116499999998,3km&count=100`,
      path: `/1.1/search/tweets.json?q=${q}&geocode=${latLong},3km&count=100`,
      // path: `/1.1/geo/search.json?query=${q}`,
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

          // let tweets = parsedData.statuses.map((data) => data.text);
          let tweets = parsedData.statuses.map(data => {
            return {
              text: data.text,
              geo: data.geo
            };
          });
          // let tweets = parsedData.statuses;

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
