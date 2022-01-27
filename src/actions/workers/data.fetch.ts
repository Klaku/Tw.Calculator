import { UsingMongo } from 'database/mongo.client';
import { Insert, InsertSnapshot } from 'database/villages.collection';
import { collection as collection_village } from 'database/world.collection';
import { collection as collection_snapshot } from 'database/snapshot.collection';
import { LogLevel, UsingLogger } from 'helpers/log.helper';
import { IdtoSnapshot, ISnapshot } from 'interfaces/snapshot.interface';
import { IdtoVillageSnapshot, IVillage } from 'interfaces/village.interface';
import { IWorldSnapshot } from 'interfaces/world.interface';
import fetch from 'node-fetch';
import { ObjectId } from 'mongodb';
export const FetchData = async () => {
	const SnapshotDate = new Date();
	await UsingLogger(`SnapShot ${SnapshotDate.toLocaleString()}`, LogLevel.Info, async () => {
		try {
			let worlds: IWorldSnapshot[] = await UsingMongo(async (db) => {
				try {
					return await db.collection(collection_village()).find({ is_available: true }).toArray();
				} catch (exception) {
					console.error(`Unable to fetch available worlds from DB`);
				}
			});
			let snapshot: ISnapshot = await UsingMongo(async (db) => {
				try {
					let new_snapshot: IdtoSnapshot = {
						created: SnapshotDate,
						year: SnapshotDate.getUTCFullYear(),
						month: SnapshotDate.getUTCMonth(),
						day: SnapshotDate.getUTCDate(),
						hour: SnapshotDate.getUTCHours(),
					};
					await db.collection(collection_snapshot()).insertOne(new_snapshot);
					let snapshot = await db.collection(collection_snapshot()).findOne(new_snapshot);
					return snapshot;
				} catch (exception) {
					console.error(`Unable to create new Snapshot`);
					return null;
				}
			});
			for await (const world of worlds) {
				await UsingLogger(`World ${world.name}`, LogLevel.Info, async () => {
					await Villages(world, snapshot);
					await Players(world);
					await Tribes(world);
					await Stats(world);
				});
			}
		} catch (exception) {
			console.error(exception);
		}
	});
};

const Villages = async (world: IWorldSnapshot, snapshot: ISnapshot) => {
	await UsingLogger(`Villages`, LogLevel.Info, async () => {
		try {
			let response = await fetch(`https://${world.sub_domain}.${world.domain}/map/village.txt`);
			let text = await response.text();
			let rows = text.split('\n').filter((x) => x != '');
			console.log(`Fetched ${rows.length} items`);

			let collection: IVillage[] = rows.map((row: string) => {
				let cells = row.split(',');
				return {
					id: Number(cells[0]),
					name: urldecode(cells[1]),
					x: Number(cells[2]),
					y: Number(cells[3]),
					playerId: Number(cells[4]),
					points: Number(cells[5]),
				};
			});

			await UsingLogger(`Insert`, LogLevel.Info, async () => {
				await Insert(
					world.sub_domain,
					collection.map((village) => {
						return { id: village.id, x: village.x, y: village.y };
					})
				);
			});

			await UsingLogger(`InsertSnapshot`, LogLevel.Info, async () => {
				await InsertSnapshot(
					world.sub_domain,
					collection.map((village) => {
						let version: IdtoVillageSnapshot = {
							village: village.id,
							owner: village.playerId,
							points: village.points,
							version: snapshot._id,
						};
						return version;
					})
				);
			});
		} catch (exception) {
			console.error(exception);
		}
	});
};
const Players = async (world: IWorldSnapshot) => {};
const Tribes = async (world: IWorldSnapshot) => {};
const Stats = async (world: IWorldSnapshot) => {};

const urldecode = (url: string) => {
	return decodeURIComponent(url.replace(/\+/g, ' '));
};
