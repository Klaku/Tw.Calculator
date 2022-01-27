"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongo_client_1 = require("database/mongo.client");
const villages_collection_1 = require("database/villages.collection");
const router = express_1.default.Router();
const CreateRouter = (cacheInstance) => {
    router.get(`/items/:world`, async (req, res) => {
        try {
            let response = cacheInstance.get(`villages_${req.params.world}`);
            if (typeof response === 'undefined' || response == null) {
                response = await (0, mongo_client_1.UsingMongo)(async (db) => {
                    let villages = await db.collection((0, villages_collection_1.collection)(req.params.world)).find({}).toArray();
                    return villages;
                });
                cacheInstance.set(`villages_${req.params.world}`, response, 15);
            }
            res.send(response);
        }
        catch (exception) {
            console.log(exception);
            res.sendStatus(500);
        }
    });
    return router;
};
exports.default = CreateRouter;
