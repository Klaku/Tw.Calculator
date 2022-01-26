import { IWorldSnapshot } from '../interfaces/world.interface';
import { UsingMongo } from './mongo.client';

export const collection = () => `worlds`;

//#region Insert
export const Insert = async (world: IWorldSnapshot[]): Promise<void> => {
	await UsingMongo(async (db) => {
		for (let index = 0; index < world.length; index++) {
			try {
				await db.collection(collection()).insertOne({
					...world[index],
				});
			} catch (exception) {
				console.error(exception);
			}
		}
	});
};
//#endregion
