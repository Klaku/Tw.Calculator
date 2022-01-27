"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Insert = exports.collection = void 0;
const mongo_client_1 = require("./mongo.client");
const collection = () => `worlds`;
exports.collection = collection;
//#region Insert
const Insert = async (world) => {
    await (0, mongo_client_1.UsingMongo)(async (db) => {
        for (let index = 0; index < world.length; index++) {
            try {
                await db.collection((0, exports.collection)()).insertOne({
                    ...world[index],
                });
            }
            catch (exception) {
                console.error(exception);
            }
        }
    });
};
exports.Insert = Insert;
//#endregion
