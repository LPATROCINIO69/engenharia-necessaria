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
exports.postOpportunity = exports.getOpportunities = void 0;
const opportunities_service_1 = require("../services/opportunities-service");
const getOpportunities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyTypeJob = req.query.typeJob;
    const keyTypeEngineering = req.query.typeEngineering;
    const jobLocation = req.query.jobLocation;
    const response = yield (0, opportunities_service_1.getOpportunitiesService)(keyTypeJob, keyTypeEngineering, jobLocation);
    //    res.status(response.statusCode).json(response.body);
    if (response.statusCode === 204) {
        res.status(204).send(null); // força enviar null
    }
    else {
        res.status(response.statusCode).json(response.body);
    }
});
exports.getOpportunities = getOpportunities;
const postOpportunity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const opportunityData = req.body;
    const response = yield (0, opportunities_service_1.createOpportunityService)(opportunityData);
    res.status(response.statusCode).json(response.body);
});
exports.postOpportunity = postOpportunity;
