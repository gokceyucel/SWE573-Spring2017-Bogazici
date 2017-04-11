import { version, keywords } from '../../package.json';
import { Router } from 'express';
import tweets from './tweets';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/tweets', tweets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
