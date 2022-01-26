"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const node_cache_1 = __importDefault(require("node-cache"));
const config_controller_1 = __importDefault(require("./controllers/config.controller"));
const world_controller_1 = __importDefault(require("./controllers/world.controller"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
(0, dotenv_1.config)();
const cache = new node_cache_1.default();
const http_server = (0, express_1.default)();
http_server.use((0, cors_1.default)());
http_server.use((0, helmet_1.default)());
http_server.use(body_parser_1.default.json());
(0, config_controller_1.default)('/api/config', http_server, cache);
(0, world_controller_1.default)('/api/world', http_server, cache);
const swaggerConfiguration = (0, swagger_jsdoc_1.default)({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tw.Extensions Express API with Swagger',
            version: '0.1.0',
        },
        servers: [
            {
                url: 'http://localhost:8888',
                description: 'Development server',
            },
        ],
    },
    apis: [`./controllers/*.*.js`],
});
http_server.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerConfiguration));
const server = http_server.listen(process.env.TW_PORT || 8000, () => {
    console.log(`Alive on port ${process.env.TW_PORT || 8000}`);
});
process.on('SIGTERM', () => {
    console.log('Received SIGTERM signal, shuting down HTTP server');
    server.close(() => {
        console.log('Server turned off');
    });
});
