import express from 'express';
import { UsingMongo } from 'database/mongo.client';
import { collection, Insert } from 'database/world.collection';
import { IWorldSnapshot } from 'interfaces/world.interface';
import NodeCache from 'node-cache';
const router = express.Router();
const CreateRouter = (cacheInstance: NodeCache) => {
	router.get(`/`, async (req, res) => {
		try {
			let response = await UsingMongo(async (db) => {
				let worlds = await db.collection(collection()).find({}).toArray();
				return worlds;
			});
			res.send(response);
		} catch (exception) {
			console.log(exception);
			res.sendStatus(500);
		}
	});

	router.post(`/`, async (req, res) => {
		if (req.body.password != process.env.TW_ADMIN_APP_PASSWORD) {
			res.status(401).send();
		} else {
			try {
				let newItem: IWorldSnapshot = { domain: req.body.domain, name: req.body.name, sub_domain: req.body.sub_name, is_available: true, last_activity: new Date() };
				await Insert([newItem]);
				res.sendStatus(200);
			} catch (exception) {
				console.log(exception);
				res.sendStatus(500);
			}
		}
	});

	return router;
};

export default CreateRouter;
