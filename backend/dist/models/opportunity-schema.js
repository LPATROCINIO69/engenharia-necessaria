"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpportunityModel = void 0;
const mongoose_1 = require("mongoose");
const fieldEngineering_1 = require("../domain/enums/fieldEngineering");
const typeJob_1 = require("../domain/enums/typeJob");
const OpportunitySchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: String,
    typeEngineering: {
        type: String,
        enum: Object.values(fieldEngineering_1.FieldEngineering), // usa os valores do enum
        required: true
    },
    typeJob: {
        type: String,
        enum: Object.values(typeJob_1.TypeJob),
        required: true
    },
    jobLocation: String,
    requirements: String,
    benefits: String,
    responsabilities: String,
    data: { type: Date, default: Date.now },
    link: { type: String, required: true, unique: true }
});
exports.OpportunityModel = (0, mongoose_1.model)("Opportunity", OpportunitySchema);
