"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevel = exports.UsingLogger = void 0;
const UsingLogger = async (name, level, callback) => {
    console.group(`${name}`);
    console.time(`${name}`);
    let output;
    try {
        output = await callback();
    }
    catch (exception) {
        console.error(`Error in log level function [${name}]`, exception);
    }
    console.timeEnd(`${name}`);
    console.group(`${name}`);
    return output;
};
exports.UsingLogger = UsingLogger;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Debug"] = 0] = "Debug";
    LogLevel[LogLevel["Info"] = 1] = "Info";
    LogLevel[LogLevel["Warning"] = 2] = "Warning";
    LogLevel[LogLevel["Error"] = 3] = "Error";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
