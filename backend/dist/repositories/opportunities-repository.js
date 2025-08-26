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
exports.insertOpportunity = exports.findAllOpportunities = void 0;
const opportunity_schema_1 = require("../models/opportunity-schema"); // Schema mongoose
const findAllOpportunities = (typeJob, typeEngineering, jobLocation) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = {};
    if (typeJob)
        filters.typeJob = typeJob;
    if (typeEngineering)
        filters.typeEngineering = typeEngineering;
    if (jobLocation)
        filters.jobLocation = jobLocation;
    const data = yield opportunity_schema_1.OpportunityModel.find(filters);
    return data;
});
exports.findAllOpportunities = findAllOpportunities;
const insertOpportunity = (opportunityData) => __awaiter(void 0, void 0, void 0, function* () {
    const newOpportunity = yield opportunity_schema_1.OpportunityModel.create(opportunityData);
    return newOpportunity;
});
exports.insertOpportunity = insertOpportunity;
