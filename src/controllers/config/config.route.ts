import express from 'express';
import { GetConfigurationObject } from '../../actions/configuration.fetch';

const router = express.Router();

router.get('/:type/:id', async (req, res) => {
	let type = req.params.type;
	let id = req.params.id;
	if (typeof id == 'undefined' || id == null || isNaN(Number(id)) || ['world', 'units', 'buildings'].indexOf(type) == -1) {
		res.sendStatus(400);
	} else {
		try {
			let key = type == 'units' ? 'get_unit_info' : type == 'world' ? 'get_config' : 'get_building_info';
			let response = await GetConfigurationObject(id, key);
			res.send(response);
		} catch (exception) {
			console.error(exception);
			res.sendStatus(500);
		}
	}
});

export default router;
