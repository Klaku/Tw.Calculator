import { ObjectId } from 'mongodb';
import { IdtoVillage, IdtoVillageSnapshot } from '../interfaces/village.interface';
import { UsingMongo } from './mongo.client';

export const collection = (id: string, snapshot?: boolean) => `${id}_villages${snapshot ? '_history' : ''}`;

//#region Insert
export const Insert = async (world_id: string, villages: IdtoVillage[]): Promise<void> => {
	await UsingMongo(async (db) => {
		await db.collection(collection(world_id)).createIndex({ id: 1 });
		for (let index = 0; index < villages.length; index++) {
			try {
				await db.collection(collection(world_id)).updateOne(villages[index], { $setOnInsert: villages[index] }, { upsert: true });
			} catch (exception) {
				console.error(exception);
			}
		}
	});
};

export const InsertSnapshot = async (world_id: string, snapshots: IdtoVillageSnapshot[]): Promise<void> => {
	await UsingMongo(async (db) => {
		await db.collection(collection(world_id)).createIndex({ village: 1, version: -1 });
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
