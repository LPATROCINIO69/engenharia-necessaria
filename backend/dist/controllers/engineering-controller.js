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
exports.getEngineering = void 0;
const engineering_service_1 = require("../services/engineering-service");
const getEngineering = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, engineering_service_1.listarEngenharias)();
    res.status(response.statusCode).json(response.body);
});
exports.getEngineering = getEngineering;
