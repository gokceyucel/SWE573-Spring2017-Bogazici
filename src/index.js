import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import publicApp from './public';
import config from './config.json';
import ejs from 'ejs';
import path from 'path';

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

// connect to db
initializeDb( db => {

	// internal middleware
	app.use(middleware({ config, db }));

	// api router
	app.use('/api', api({ config, db }));

	// app router
	app.use('/app', publicApp({ config, db }));

	const port = process.env.PORT || config.port;

	app.server.listen(port);

	console.log(`Started on port ${port}`);
});

export default app;
