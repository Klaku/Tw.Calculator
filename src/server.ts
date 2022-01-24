import express from 'express';
import helmet from 'helmet';
import NodeCache from 'node-cache';
import useConfigRoute from './controllers/config.controller';
import cors from 'cors';
import { config } from 'dotenv';
config();
const cache = new NodeCache();
const http_server = express();
http_server.use(cors());
http_server.use(helmet());

useConfigRoute('/api/config', http_server, cache);

const server = http_server.listen(process.env.TW_PORT || 8000);

process.on('SIGTERM', () => {
	console.log('Received SIGTERM signal, shuting down HTTP server');
	server.close(() => {
		console.log('Server turned off');
	});
});
