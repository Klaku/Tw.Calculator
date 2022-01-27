"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertSnapshot = exports.Insert = exports.collection = void 0;
const mongodb_1 = require("mongodb");
const mongo_client_1 = require("./mongo.client");
const collection = (id, snapshot) => `${id}_villages${snapshot ? '_history' : ''}`;
exports.collection = collection;
//#region Insert
const Insert = async (world_id, villages) => {
    await (0, mongo_client_1.UsingMongo)(async (db) => {
        for (let index = 0; index < villages.length; index++) {
            try {
                await db.collection((0, exports.collection)(world_id)).insertOne({
                    ...villages[index],
                    _id: new mongodb_1.ObjectId(villages[index]._id),
                });
            }
            catch (exception) {
                console.error(exception);
            }
        }
    });
};
exports.Insert = Insert;
const InsertSnapshot = async (world_id, snapshots) => {
    await (0, mongo_client_1.UsingMongo)(async (db) => {
        for (let index = 0; index < snapshots.length; index++) {
            try {
                await db.collection((0, exports.collection)(world_id, true)).insertOne({
                    ...snapshots[index],
                });
            }
            catch (exception) {
                console.error(exception);
            }
        }
    });
};
exports.InsertSnapshot = InsertSnapshot;
//#endregion
