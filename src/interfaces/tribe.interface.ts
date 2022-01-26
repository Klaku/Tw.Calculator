export interface ITribe {
	id: number;
	name: string;
	tag: string;
	members: number;
	villages: number;
	points: number;
	rank: number;
}

export interface IdtoTribe {
	_id: number;
}

export interface IdtoTribeSnapshot {
	name: string;
	tag: string;
	members: number;
	villages: number;
	points: number;
	rank: number;
}
