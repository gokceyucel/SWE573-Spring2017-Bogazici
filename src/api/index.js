import { version, keywords } from '../../package.json';
import { Router } from 'express';
import tweets from './tweets';
import config from '../../config.json';
import { OAuth } from 'oauth';

const REQUEST_TOKEN_URL = 'https://api.twitter.com/oauth/request_token';
const ACCESS_TOKEN_URL = 'https://api.twitter.com/oauth/access_token';
const OAUTH_VERSION = '1.0';
const HASH_VERSION = 'HMAC-SHA1';

const consumer_key = config.consumer_key;
const consumer_secret = config.consumer_secret;
const callback_url = config.callback_url;

const oa = new OAuth(REQUEST_TOKEN_URL, ACCESS_TOKEN_URL, consumer_key, consumer_secret, OAUTH_VERSION, callback_url, HASH_VERSION);

let _oauth_access_token_secret;

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/tweets', tweets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	// TODO: move elsewhere
	api.get('/request-token', (req, res) => {
		oa.getOAuthRequestToken((err, oauth_token, oauth_token_secret, results) => {
			if (err) {
				throw new Error(([err.statusCode, err.data].join(': ')));
			}
			_oauth_access_token_secret = oauth_token_secret;
			res.redirect('https://api.twitter.com/oauth/authenticate?oauth_token=' + oauth_token);
		});
	});

	api.get("/access-token", function (req, res) {
		var oauth_token = req.query.oauth_token,
			verifier = req.query.oauth_verifier;

		oa.getOAuthAccessToken(oauth_token, _oauth_access_token_secret, verifier,
			function (err, oauth_access_token, oauth_access_token_secret, results2) {
				if (err) {
					if (parseInt(err.statusCode) == 401) {
						throw new Error('The pin number you have entered is incorrect');
					}
				}
				console.log('Your OAuth Access Token: ', oauth_access_token);
				console.log('Your OAuth Token Secret: ', oauth_access_token_secret);
				console.log('Now, save these two values, along with your origional consumer secret and key and use these in your twitter app');
			});


		// twitter.getAccessToken(requestToken, _requestSecret, verifier, function (err, accessToken, accessSecret) {
		// 	if (err)
		// 		res.status(500).send(err);
		// 	else
		// 		twitter.verifyCredentials(accessToken, accessSecret, function (err, user) {
		// 			if (err)
		// 				res.status(500).send(err);
		// 			else
		// 				res.send(user);
		// 		});
		// });
	});

	api.get('/welcome', (req, res) => {
		res.json({ message: 'welcome from twitter' });
	});

	return api;
}
