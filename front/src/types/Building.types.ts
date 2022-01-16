export interface IBuilding {
	name: string;
	levels: IBuildingLevel[];
	requirements: IRequirements[];
}

export interface IBuildingLevel {
	level: number;
	wood: number;
	stone: number;
	iron: number;
	bonus: number;
	time: number;
	pop: number;
}

export interface IRequirements {
	name: string;
	level: string;
}
