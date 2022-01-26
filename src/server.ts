import express from 'express';
import helmet from 'helmet';
import NodeCache from 'node-cache';
import useConfigRoute from './controllers/config.controller';
import world_router from './controllers/world/world.controller';
import cors from 'cors';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import swagger from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swagger_configuration } from './swagger/swagger';
config();
const cache = new NodeCache();
const http_server = express();
http_server.use(cors());
http_server.use(helmet());
http_server.use(bodyParser.json());
http_server.use('/', (req, res, next) => {
	console.log(`[${new Date().toLocaleTimeString()}]\t${req.path}\t${JSON.stringify(req.query)}`);
	next();
});
http_server.use('/world', world_router);

http_server.use('/swagger', swagger.serve, swagger.setup(swagger_configuration));

const server = http_server.listen(process.env.TW_PORT || 8000, () => {
	console.log(`Alive on port ${process.env.TW_PORT || 8000}`);
});

process.on('SIGTERM', () => {
	console.log('Received SIGTERM signal, shuting down HTTP server');
	server.close(() => {
		console.log('Server turned off');
	});
});
