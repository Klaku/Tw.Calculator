import { Db, MongoClient } from 'mongodb';

const url = process.env.TW_DB_URL || 'mongodb://localhost:27017';
const name = process.env.TW_DB_NAME || 'TwCalculatorDB';

export const UsingMongo = async (callback: (database: Db) => Promise<any>): Promise<any> => {
	const client = new MongoClient(url);
	let response;
	try {
		await client.connect();
		response = await callback(client.db(name));
		await client.close();
	} catch (exception) {
		console.error(exception);
		await client.close();
	}
	return response;
};
