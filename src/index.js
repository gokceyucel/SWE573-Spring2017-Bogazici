import app from './server';
import config from './config.json';

const port = process.env.PORT || config.port;

app.server.listen(port, (err) => {
	if (err) return console.error(err);
	console.log(`Server listening port ${port}`);
});
