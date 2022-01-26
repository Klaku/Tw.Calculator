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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsingMongo = void 0;
const mongodb_1 = require("mongodb");
const url = process.env.TW_DB_URL || 'mongodb://localhost:27017';
const name = process.env.TW_DB_NAME || 'TwCalculatorDB';
const UsingMongo = (callback) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new mongodb_1.MongoClient(url);
    let response;
    try {
        yield client.connect();
        response = yield callback(client.db(name));
        yield client.close();
    }
    catch (exception) {
        console.error(exception);
        yield client.close();
    }
    return response;
});
exports.UsingMongo = UsingMongo;
