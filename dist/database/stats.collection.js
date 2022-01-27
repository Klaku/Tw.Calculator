"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatType = exports.InsertSnapshot = void 0;
const mongo_client_1 = require("./mongo.client");
const collection = (id, stat_type, snapshot) => `${id}_${stat_type}_${snapshot ? 'history' : ''}`;
//#region Insert
const InsertSnapshot = async (world_id, snapshots, stat_type) => {
    await (0, mongo_client_1.UsingMongo)(async (db) => {
        for (let index = 0; index < snapshots.length; index++) {
            try {
                await db.collection(collection(world_id, stat_type, true)).insertOne({
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
exports.StatType = {
    ATT: 'att',
    ALL: 'all',
    DEF: 'def',
    TATT: 'att_tribe',
    TALL: 'all_tribe',
    TDEF: 'def_tribe',
};
//#endregion
