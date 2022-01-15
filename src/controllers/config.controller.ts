import express from 'express';
import NodeCache from 'node-cache';
import { GetConfigurationObject } from './../actions/configuration.fetch';

const Route = (path: string, app: express.Application, cache: NodeCache) => {
	// http://localhost:8000/api/config/world/192
	app.get(`${path}/:type/:id`, async (req, res) => {
		let type = req.params.type;
		let id = req.params.id;
		if (typeof id == 'undefined' || id == null || isNaN(Number(id)) || ['world', 'units', 'buildings'].indexOf(type) == -1) {
			res.status(400);
			res.send('Invalid parameter');
		} else {
			let cacheKey = `${path}/${type}/${id}`;
			let response = cache.get(cacheKey);
			if (typeof response == 'undefined') {
				let key = type == 'units' ? 'get_unit_info' : type == 'world' ? 'get_config' : 'get_building_info';
				response = await GetConfigurationObject(id, key);
			}
			res.send(response);
		}
	});
};
export default Route;
