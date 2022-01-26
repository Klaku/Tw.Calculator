import { ObjectId } from 'mongodb';
import { IdtoPlayer, IdtoPlayerSnapshot } from '../interfaces/player.interface';
import { UsingMongo } from './mongo.client';

const collection = (id: string, snapshot?: boolean) => `${id}_players${snapshot ? '_history' : ''}`;

//#region Insert
export const Insert = async (world_id: string, players: IdtoPlayer[]): Promise<void> => {
	await UsingMongo(async (db) => {
		for (let index = 0; index < players.length; index++) {
			try {
				await db.collection(collection(world_id)).insertOne({
					...players[index],
					_id: new ObjectId(players[index]._id),
				});
			} catch (exception) {
				console.error(exception);
			}
		}
	});
};

export const InsertSnapshot = async (world_id: string, snapshots: IdtoPlayerSnapshot[]): Promise<void> => {
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
