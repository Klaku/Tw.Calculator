"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchData = void 0;
const mongo_client_1 = require("database/mongo.client");
const villages_collection_1 = require("database/villages.collection");
const world_collection_1 = require("database/world.collection");
const snapshot_collection_1 = require("database/snapshot.collection");
const log_helper_1 = require("helpers/log.helper");
const node_fetch_1 = __importDefault(require("node-fetch"));
const FetchData = async () => {
    const SnapshotDate = new Date();
    (0, log_helper_1.UsingLogger)(`SnapShot ${SnapshotDate.toLocaleString()}`, log_helper_1.LogLevel.Info, async () => {
        try {
            let worlds = await (0, mongo_client_1.UsingMongo)(async (db) => {
                try {
                    return await db.collection((0, world_collection_1.collection)()).find({ is_available: true }).toArray();
                }
                catch (exception) {
                    console.error(`Unable to fetch available worlds from DB`);
                }
            });
            let snapshot = await (0, mongo_client_1.UsingMongo)(async (db) => {
                try {
                    let new_snapshot = {
                        created: SnapshotDate,
                        year: SnapshotDate.getUTCFullYear(),
                        month: SnapshotDate.getUTCMonth(),
                        day: SnapshotDate.getUTCDate(),
                        hour: SnapshotDate.getUTCHours(),
                    };
                    await db.collection((0, snapshot_collection_1.collection)()).insertOne(new_snapshot);
                    let snapshot = await db.collection((0, snapshot_collection_1.collection)()).findOne(new_snapshot);
                    console.log('Created Snapshot', snapshot);
                    return snapshot;
                }
                catch (exception) {
                    console.error(`Unable to create new Snapshot`);
                    return null;
                }
            });
            worlds.forEach(async (world) => {
                (0, log_helper_1.UsingLogger)(`World ${world.name}`, log_helper_1.LogLevel.Info, async () => {
                    await Villages(world, snapshot);
                    await Players(world);
                    await Tribes(world);
                    await Stats(world);
                });
            });
        }
        catch (exception) {
            console.error(exception);
        }
    });
};
exports.FetchData = FetchData;
const Villages = async (world, snapshot) => {
    (0, log_helper_1.UsingLogger)(`Villages`, log_helper_1.LogLevel.Info, async () => {
        try {
            let response = await (0, node_fetch_1.default)(`https://${world.sub_domain}.${world.domain}/map/village.txt`);
            let text = await response.text();
            let rows = text.split('\n').filter((x) => x != '');
            console.log(`Fetched ${rows} items`);
            let collection = rows.map((row) => {
                let cells = row.split(',');
                return {
                    id: Number(cells[0]),
                    name: urldecode(cells[1]),
                    x: Number(cells[2]),
                    y: Number(cells[3]),
                    playerId: Number(cells[4]),
                    points: Number(cells[5]),
                };
            });
            await (0, villages_collection_1.Insert)(world.sub_domain, collection.map((village) => {
                return { _id: village.id, x: village.x, y: village.y };
            }));
            await (0, villages_collection_1.InsertSnapshot)(world.sub_domain, collection.map((village) => {
                let version = {
                    village: village.id,
                    owner: village.playerId,
                    points: village.points,
                    version: snapshot._id,
                };
                return version;
            }));
        }
        catch (exception) {
            console.error(exception);
        }
    });
};
const Players = async (world) => { };
const Tribes = async (world) => { };
const Stats = async (world) => { };
const urldecode = (url) => {
    return decodeURIComponent(url.replace(/\+/g, ' '));
};
