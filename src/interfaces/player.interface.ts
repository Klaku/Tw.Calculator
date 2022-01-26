export interface IPlayer {
	id: number;
	name: string;
	tribe_id: number;
	villages: number;
	rank: number;
	points: number;
}

export interface IdtoPlayer {
	_id: number;
	name: number;
}

export interface IdtoPlayerSnapshot {
	tribe_id: number;
	villages: number;
	rank: number;
	points: number;
}
