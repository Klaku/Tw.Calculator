"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsingMongo = void 0;
const mongodb_1 = require("mongodb");
const url = process.env.TW_DB_URL || 'mongodb://localhost:27017';
const name = process.env.TW_DB_NAME || 'TwCalculatorDB';
const UsingMongo = async (callback) => {
    const client = new mongodb_1.MongoClient(url);
    let response;
    try {
        await client.connect();
        response = await callback(client.db(name));
        await client.close();
    }
    catch (exception) {
        console.error(exception);
        await client.close();
    }
    return response;
};
exports.UsingMongo = UsingMongo;
