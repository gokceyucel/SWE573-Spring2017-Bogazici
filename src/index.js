<<<<<<< HEAD
import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import publicApp from './public';
import config from './config';
import ejs from 'ejs';
import path from 'path';
=======
import app from './server';
import config from './config.json';
>>>>>>> Test implementations using mocha

const port = process.env.PORT || config.port;

<<<<<<< HEAD
// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

// set static files directory
app.use('/static', express.static(path.join(__dirname, 'public')))

app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit: config.bodyLimit
}));

// connect to db
initializeDb(db => {

	// internal middleware
	app.use(middleware({ config, db }));

	// api router
	app.use('/api', api({ config, db }));

	// app router
	app.use('/app', publicApp({ config, db }));

	const port = process.env.PORT || config.port;

	app.server.listen(port);

	console.log(`Started on port ${port}`);
=======
app.server.listen(port, (err) => {
  if (err) return console.error(err);
  console.log(`Server listening port ${port}`);
>>>>>>> Test implementations using mocha
});
