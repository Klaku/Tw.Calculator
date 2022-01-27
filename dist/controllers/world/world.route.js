"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongo_client_1 = require("database/mongo.client");
const world_collection_1 = require("database/world.collection");
const router = express_1.default.Router();
const CreateRouter = (cacheInstance) => {
    router.get(`/`, async (req, res) => {
        try {
            let response = await (0, mongo_client_1.UsingMongo)(async (db) => {
                let worlds = await db.collection((0, world_collection_1.collection)()).find({}).toArray();
                return worlds;
            });
            res.send(response);
        }
        catch (exception) {
            console.log(exception);
            res.sendStatus(500);
        }
    });
    router.post(`/`, async (req, res) => {
        if (req.body.password != process.env.TW_ADMIN_APP_PASSWORD) {
            res.status(401).send();
        }
        else {
            try {
                let newItem = { domain: req.body.domain, name: req.body.name, sub_domain: req.body.sub_name, is_available: true, last_activity: new Date() };
                await (0, world_collection_1.Insert)([newItem]);
                res.sendStatus(200);
            }
            catch (exception) {
                console.log(exception);
                res.sendStatus(500);
            }
        }
    });
    return router;
};
exports.default = CreateRouter;
