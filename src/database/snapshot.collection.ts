import { ISnapshot } from '../interfaces/snapshot.interface';
import { UsingMongo } from './mongo.client';

export const collection = () => `snapshots`;

//#region Insert
export const InsertSnapshot = async (snapshot: ISnapshot[]): Promise<void> => {
	await UsingMongo(async (db) => {
		try {
			await db.collection(collection()).insertOne({
				...snapshot,
			});
		} catch (exception) {
			console.error(exception);
		}
	});
};
//#endregion
