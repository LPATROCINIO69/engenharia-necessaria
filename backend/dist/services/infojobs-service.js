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
exports.scrapeInfojobs = void 0;
const infojobs_adapter_1 = require("../adapters/infojobs-adapter");
const opportunity_schema_1 = require("../models/opportunity-schema");
const fieldEngineering_1 = require("../domain/enums/fieldEngineering");
const fieldEngineerMapper_1 = require("../mappers/fieldEngineerMapper");
const scrapeInfojobs = () => __awaiter(void 0, void 0, void 0, function* () {
    const keys = Object.keys(fieldEngineering_1.FieldEngineering);
    let opportunities = [];
    for (const keySelected of keys) {
        const aliases = (0, fieldEngineerMapper_1.getAliasesByField)(fieldEngineering_1.FieldEngineering[keySelected]);
        for (const searchedText of aliases) {
            const results = yield (0, infojobs_adapter_1.infojobsAdapter)(searchedText);
            opportunities = [...opportunities, ...results];
            //              opportunities = await infojobsAdapter(searchedText);
        }
    }
    // try{
    //     await OpportunityModel.insertMany(opportunities);
    // } catch(error){
    //     console.error("Erro ao criar a oportunidade: ", error);
    // } 
    console.log('quantidade de registros:', opportunities.length);
    for (const opp of opportunities) {
        try {
            yield opportunity_schema_1.OpportunityModel.create(opp);
        }
        catch (err) {
            const error = err;
            if (error.code === 11000) {
                console.warn("Duplicata:", opp.link);
            }
            else {
                console.error("Erro ao salvar:", error);
            }
        }
    }
    return opportunities;
});
exports.scrapeInfojobs = scrapeInfojobs;
