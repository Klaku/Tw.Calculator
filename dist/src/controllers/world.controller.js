"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongo_client_1 = require("./../database/mongo.client");
const world_collection_1 = require("../database/world.collection");
const router = express_1.default.Router();
router.get(`/`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield (0, mongo_client_1.UsingMongo)((db) => __awaiter(void 0, void 0, void 0, function* () {
        let worlds = yield db.collection((0, world_collection_1.collection)()).find({}).toArray();
        return worlds;
    }));
    res.send(response);
}));
router.post(`/`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, world_collection_1.Insert)(Object.assign(Object.assign({}, req.body), { is_available: true, last_activity: new Date() }));
    res.sendStatus(200);
}));
exports.default = router;
