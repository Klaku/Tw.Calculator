"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tw.Extensions Express API with Swagger',
            version: '0.1.0'
        },
        servers: [
            {
                url: `http://localhost:8888`,
            },
        ],
    },
    apis: ['./*.js'],
};
const specs = (0, swagger_jsdoc_1.default)(options);
const Route = (path, app) => {
    // http://localhost:8000/api/swagger
    app.use(`${path}`, swagger_ui_express_1.default.serve);
    app.get(`${path}`, swagger_ui_express_1.default.setup(specs));
};
exports.default = Route;
