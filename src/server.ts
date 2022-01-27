import express from 'express';
import helmet from 'helmet';
import NodeCache from 'node-cache';
import world_router from 'controllers/world/world.route';
import config_router from 'controllers/config/config.route';
import village_router from 'controllers/village/village.route';
import cors from 'cors';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import swagger from 'swagger-ui-express';
import { swagger_configuration } from './swagger/swagger';
import shedule from 'node-schedule';
import { FetchData } from './actions/workers/data.fetch';
config();
const cache_instance = new NodeCache();
const http_server = express();
http_server.use(cors());
http_server.use(helmet());
http_server.use(bodyParser.json());
http_server.use('/', (req, res, next) => {
	console.log(`[${new Date().toLocaleTimeString()}]\t${req.path}\t${JSON.stringify(req.method == 'POST' ? req.body : req.query)}`);
	next();
});

http_server.use('/world', world_router(cache_instance));
http_server.use('/config', config_router);
http_server.use('/village', village_router(cache_instance));

http_server.use('/swagger', swagger.serve, swagger.setup(swagger_configuration));

const server = http_server.listen(process.env.TW_PORT || 8000, () => {
	console.log(`Alive on port ${process.env.TW_PORT || 8000}`);
});

let background_proces = shedule.scheduleJob('data_miner', '0 5 * * * *', () => {
	console.log(new Date().toLocaleTimeString());
});

FetchData();

process.on('SIGTERM', () => {
	console.log('Received SIGTERM signal, shuting down HTTP server');
	server.close(() => {
		console.log('Server turned off');
	});
});
