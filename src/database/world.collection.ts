import { ObjectId } from 'mongodb';
import { IStatsSnapshot } from '../interfaces/stats.interface';
import { UsingMongo } from './mongo.client';

const collection = (id: string, snapshot?: boolean) => `${id}_tribes${snapshot ? '_history' : ''}`;

//#region Insert
export const InsertSnapshot = async (world_id: string, snapshots: IStatsSnapshot[]): Promise<void> => {
	await UsingMongo(async (db) => {
		for (let index = 0; index < snapshots.length; index++) {
			try {
				await db.collection(collection(world_id, true)).insertOne({
					...snapshots[index],
				});
			} catch (exception) {
				console.error(exception);
			}
		}
	});
};
//#endregion
