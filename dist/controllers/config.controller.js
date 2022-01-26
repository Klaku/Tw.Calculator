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
const configuration_fetch_1 = require("./../actions/configuration.fetch");
const Route = (path, app, cache) => {
    // http://localhost:8000/api/config/world/192
    app.get(`${path}/:type/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let type = req.params.type;
        let id = req.params.id;
        if (typeof id == 'undefined' || id == null || isNaN(Number(id)) || ['world', 'units', 'buildings'].indexOf(type) == -1) {
            res.status(400);
            res.send('Invalid parameter');
        }
        else {
            let cacheKey = `${path}/${type}/${id}`;
            let response = cache.get(cacheKey);
            if (typeof response == 'undefined') {
                let key = type == 'units' ? 'get_unit_info' : type == 'world' ? 'get_config' : 'get_building_info';
                response = yield (0, configuration_fetch_1.GetConfigurationObject)(id, key);
            }
            res.send(response);
        }
    }));
};
exports.default = Route;
