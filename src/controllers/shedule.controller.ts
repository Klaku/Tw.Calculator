import express, { response } from 'express';
import NodeCache from 'node-cache';

const Route = (path: string, app: express.Application, cache: NodeCache) => {
	app.get(`${path}/:world_identity`, async (req, rep) => {
		let identity = req.params.world_identity;
		if (typeof identity == 'undefined' || identity == null) {
			response.status(400);
			response.send('Identity required');
		}else{
            
        }
	});
};

export default Route;
