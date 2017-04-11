import { version, keywords } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import tests from './tests';
import tweets from './tweets';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));
	api.use('/tests', tests({ config, db }));
	api.use('/tweets', tweets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
