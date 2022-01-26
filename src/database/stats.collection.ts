import { IStatsSnapshot } from '../interfaces/stats.interface';
import { UsingMongo } from './mongo.client';

const collection = (id: string, stat_type: string, snapshot?: boolean) => `${id}_${stat_type}_${snapshot ? 'history' : ''}`;

//#region Insert
export const InsertSnapshot = async (world_id: string, snapshots: IStatsSnapshot[], stat_type: string): Promise<void> => {
	await UsingMongo(async (db) => {
		for (let index = 0; index < snapshots.length; index++) {
			try {
				await db.collection(collection(world_id, stat_type, true)).insertOne({
					...snapshots[index],
				});
			} catch (exception) {
				console.error(exception);
			}
		}
	});
};

export const StatType = {
	ATT: 'att',
	ALL: 'all',
	DEF: 'def',
	TATT: 'att_tribe',
	TALL: 'all_tribe',
	TDEF: 'def_tribe',
};
//#endregion
