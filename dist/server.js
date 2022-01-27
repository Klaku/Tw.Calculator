"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const node_cache_1 = __importDefault(require("node-cache"));
const world_route_1 = __importDefault(require("controllers/world/world.route"));
const config_route_1 = __importDefault(require("controllers/config/config.route"));
const village_route_1 = __importDefault(require("controllers/village/village.route"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger/swagger");
const node_schedule_1 = __importDefault(require("node-schedule"));
const data_fetch_1 = require("./actions/workers/data.fetch");
(0, dotenv_1.config)();
const cache_instance = new node_cache_1.default();
const http_server = (0, express_1.default)();
http_server.use((0, cors_1.default)());
http_server.use((0, helmet_1.default)());
http_server.use(body_parser_1.default.json());
http_server.use('/', (req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}]\t${req.path}\t${JSON.stringify(req.method == 'POST' ? req.body : req.query)}`);
    next();
});
http_server.use('/world', (0, world_route_1.default)(cache_instance));
http_server.use('/config', config_route_1.default);
http_server.use('/village', (0, village_route_1.default)(cache_instance));
http_server.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swagger_configuration));
const server = http_server.listen(process.env.TW_PORT || 8000, () => {
    console.log(`Alive on port ${process.env.TW_PORT || 8000}`);
});
let background_proces = node_schedule_1.default.scheduleJob('data_miner', '0 5 * * * *', () => {
    console.log(new Date().toLocaleTimeString());
});
(0, data_fetch_1.FetchData)();
process.on('SIGTERM', () => {
    console.log('Received SIGTERM signal, shuting down HTTP server');
    server.close(() => {
        console.log('Server turned off');
    });
});
