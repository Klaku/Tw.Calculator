import { ObjectId } from 'mongodb';

export interface IVillage {
	id: number;
	name: string;
	x: number;
	y: number;
	playerId: number;
	points: number;
}

export interface IdtoVillage {
	id: number;
	x: number;
	y: number;
}

export interface IdtoVillageSnapshot {
	village: number;
	owner: number;
	points: number;
	version: ObjectId;
}
