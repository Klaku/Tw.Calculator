export const UsingLogger = async (name: string, level: LogLevel, callback: () => any) => {
	console.group(`${name}`);
	console.time(`${name}`);
	let output;
	try {
		output = await callback();
	} catch (exception) {
		console.error(`Error in log level function [${name}]`, exception);
	}
	console.timeEnd(`${name}`);
	console.groupEnd();
	return output;
};

export enum LogLevel {
	Debug = 0,
	Info = 1,
	Warning = 2,
	Error = 3,
}
