"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConfigurationObject = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const xml2js_1 = require("xml2js");
const GetConfigurationObject = async (world_id, key) => {
    return new Promise(async (resolve) => {
        let response = await (0, node_fetch_1.default)(`https://pl${world_id}.plemiona.pl/interface.php?func=${key}`, { method: 'POST' });
        let xml = await response.text();
        (0, xml2js_1.parseString)(xml, (err, result) => {
            resolve(result);
        });
    });
};
exports.GetConfigurationObject = GetConfigurationObject;
