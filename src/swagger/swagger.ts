import { World } from 'controllers/world/world.swagger';
export const swagger_configuration = {
	openapi: '3.0.2',
	info: {
		title: 'Tw.Extension',
	},
	servers: [{ url: 'http://localhost:8888' }],
	paths: {
		'/world': {
			get: World.get,
			post: World.post,
		},
	},
};
