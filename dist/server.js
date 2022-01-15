"use strict";
// import express from "express";
// import fetch from "node-fetch";
// import cors from "cors";
// import { parseString } from "xml2js";
// const app = express();
// app.use(cors());
// app.use(express.static("public"));
// app.get("/api/get_unit_info/:world", async (request, response) => {
//   let rep = await fetch(
//     `https://pl174.plemiona.pl/interface.php?func=get_unit_info`,
//     { method: "POST" }
//   );
//   let xml = await rep.text();
//   parseString(xml, (err, result) => {
//     response.send(result);
//   });
// });
// app.listen(8000);
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const http_server = (0, express_1.default)();
http_server.use((0, helmet_1.default)());
const server = http_server.listen(8000);
process.on("SIGTERM", () => {
    console.log("Received SIGTERM signal, shuting down HTTP server");
    server.close(() => {
        console.log("Server turned off");
    });
});
