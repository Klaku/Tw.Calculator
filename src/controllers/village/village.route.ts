import express from 'express';
import { UsingMongo } from 'database/mongo.client';
import { collection } from 'database/villages.collection';
import NodeCache from 'node-cache';
const router = express.Router();
const CreateRouter = (cacheInstance: NodeCache) => {
	router.get(`/items/:world`, async (req, res) => {
		try {
			let response = cacheInstance.get(`villages_${req.params.world}`);
			if (typeof response === 'undefined' || response == null) {
				response = await UsingMongo(async (db) => {
					let villages = await db.collection(collection(req.params.world)).find({}).toArray();
					return villages;
				});
				cacheInstance.set(`villages_${req.params.world}`, response, 15);
			}
			res.send(response);
		} catch (exception) {
			console.log(exception);
			res.sendStatus(500);
		}
	});

	return router;
};

export default CreateRouter;
