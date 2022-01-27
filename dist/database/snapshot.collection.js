"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertSnapshot = exports.collection = void 0;
const mongo_client_1 = require("./mongo.client");
const collection = () => `snapshots`;
exports.collection = collection;
//#region Insert
const InsertSnapshot = async (snapshot) => {
    await (0, mongo_client_1.UsingMongo)(async (db) => {
        try {
            await db.collection((0, exports.collection)()).insertOne({
                ...snapshot,
            });
        }
        catch (exception) {
            console.error(exception);
        }
    });
};
exports.InsertSnapshot = InsertSnapshot;
//#endregion
