"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swagger_configuration = void 0;
const world_swagger_1 = require("controllers/world/world.swagger");
exports.swagger_configuration = {
    openapi: '3.0.2',
    info: {
        title: 'Tw.Extension',
    },
    servers: [{ url: 'http://localhost:8888' }],
    paths: {
        '/world': {
            get: world_swagger_1.World.get,
            post: world_swagger_1.World.post,
        },
    },
};
