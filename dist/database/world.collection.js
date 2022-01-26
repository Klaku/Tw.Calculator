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
exports.Insert = exports.collection = void 0;
const mongo_client_1 = require("./mongo.client");
const collection = () => `worlds`;
exports.collection = collection;
//#region Insert
const Insert = (world) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongo_client_1.UsingMongo)((db) => __awaiter(void 0, void 0, void 0, function* () {
        for (let index = 0; index < world.length; index++) {
            try {
                yield db.collection((0, exports.collection)()).insertOne(Object.assign({}, world[index]));
            }
            catch (exception) {
                console.error(exception);
            }
        }
    }));
});
exports.Insert = Insert;
//#endregion
