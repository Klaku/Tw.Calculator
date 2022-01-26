import { ObjectId } from 'mongodb';
import { IdtoTribe, IdtoTribeSnapshot } from '../interfaces/tribe.interface';
import { UsingMongo } from './mongo.client';

const collection = (id: string, snapshot?: boolean) => `${id}_tribes${snapshot ? '_history' : ''}`;

//#region Insert
export const Insert = async (world_id: string, tribes: IdtoTribe[]): Promise<void> => {
	await UsingMongo(async (db) => {
		for (let index = 0; index < tribes.length; index++) {
			try {
				await db.collection(collection(world_id)).insertOne({
					...tribes[index],
					_id: new ObjectId(tribes[index]._id),
				});
			} catch (exception) {
				console.error(exception);
			}
		}
	});
};

export const InsertSnapshot = async (world_id: string, snapshots: IdtoTribeSnapshot[]): Promise<void> => {
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
