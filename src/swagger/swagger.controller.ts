export interface ISwaggerController {
	get?: IdtoInterface;
	post?: IdtoInterface;
}

export interface IdtoInterface {
	tags: string[];
	description: string;
	operationId: string;
	responses: { [key: string]: IdtoContainer };
	requestBody?: IdtoContainer;
	parameters?: any;
}

export interface IdtoParameter {
	name: string;
	in: string; // path
	description: string;
	required: boolean;
	shema: IdtoSchema;
	style: string; //simple
}

export interface IdtoContainer {
	description: string;
	content: {
		'application/json': {
			schema?: IdtoSchema;
		};
	};
}

export interface IdtoSchema {
	type: string;
	description?: string;
	items?: IdtoSchema;
	properties?: { [key: string]: IdtoSchema };
	required?: string[];
}
