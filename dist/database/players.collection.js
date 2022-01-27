"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertSnapshot = exports.Insert = void 0;
const mongodb_1 = require("mongodb");
const mongo_client_1 = require("./mongo.client");
const collection = (id, snapshot) => `${id}_players${snapshot ? '_history' : ''}`;
//#region Insert
const Insert = async (world_id, players) => {
    await (0, mongo_client_1.UsingMongo)(async (db) => {
        for (let index = 0; index < players.length; index++) {
            try {
                await db.collection(collection(world_id)).insertOne({
                    ...players[index],
                    _id: new mongodb_1.ObjectId(players[index]._id),
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
                await db.collection(collection(world_id, true)).insertOne({
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
