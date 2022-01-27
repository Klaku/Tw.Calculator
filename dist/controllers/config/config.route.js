"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const configuration_fetch_1 = require("../../actions/configuration.fetch");
const router = express_1.default.Router();
router.get('/:type/:id', async (req, res) => {
    let type = req.params.type;
    let id = req.params.id;
    if (typeof id == 'undefined' || id == null || isNaN(Number(id)) || ['world', 'units', 'buildings'].indexOf(type) == -1) {
        res.sendStatus(400);
    }
    else {
        try {
            let key = type == 'units' ? 'get_unit_info' : type == 'world' ? 'get_config' : 'get_building_info';
            let response = await (0, configuration_fetch_1.GetConfigurationObject)(id, key);
            res.send(response);
        }
        catch (exception) {
            console.error(exception);
            res.sendStatus(500);
        }
    }
});
exports.default = router;
