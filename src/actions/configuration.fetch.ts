import fetch from 'node-fetch';
import { parseString } from 'xml2js';

export const GetConfigurationObject = async (world_id: string, key: string) => {
	return new Promise(async (resolve) => {
		let response = await fetch(`https://pl${world_id}.plemiona.pl/interface.php?func=${key}`, { method: 'POST' });
		let xml = await response.text();
		parseString(xml, (err, result) => {
			resolve(result);
		});
	});
};
