import { ObjectId } from 'mongodb';

export interface IdtoSnapshot {
	created: Date;
	year: number;
	month: number;
	day: number;
	hour: number;
}
export interface ISnapshot {
	_id: ObjectId;
	created: Date;
	year: number;
	month: number;
	day: number;
	hour: number;
}
