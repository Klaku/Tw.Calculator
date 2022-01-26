"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const node_cache_1 = __importDefault(require("node-cache"));
const world_controller_1 = __importDefault(require("./controllers/world.controller"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const OpenApiConfiguration_json_1 = __importDefault(require("../OpenApiConfiguration.json"));
(0, dotenv_1.config)();
const cache = new node_cache_1.default();
const http_server = (0, express_1.default)();
http_server.use((0, cors_1.default)());
http_server.use((0, helmet_1.default)());
http_server.use(body_parser_1.default.json());
http_server.use('/world', world_controller_1.default);
http_server.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(OpenApiConfiguration_json_1.default));
http_server.use('/', (req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()} ${req.path}]`);
});
const server = http_server.listen(process.env.TW_PORT || 8000, () => {
    console.log(`Alive on port ${process.env.TW_PORT || 8000}`);
});
process.on('SIGTERM', () => {
    console.log('Received SIGTERM signal, shuting down HTTP server');
    server.close(() => {
        console.log('Server turned off');
    });
});
