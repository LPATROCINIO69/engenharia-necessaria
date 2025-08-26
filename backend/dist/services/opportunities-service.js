"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.createOpportunityService = exports.getOpportunitiesService = void 0;
const fieldEngineering_1 = require("../domain/enums/fieldEngineering");
const typeJob_1 = require("../domain/enums/typeJob");
const opportunities_repository_1 = require("../repositories/opportunities-repository");
const HttpResponse = __importStar(require("../utils/http-helper"));
const getOpportunitiesService = (keyTypeJob, keyTypeEngineering, jobLocation) => __awaiter(void 0, void 0, void 0, function* () {
    let typeJob;
    if (keyTypeJob && keyTypeJob.toUpperCase() in typeJob_1.TypeJob)
        typeJob = typeJob_1.TypeJob[keyTypeJob.toUpperCase()];
    else
        typeJob = undefined;
    let typeEngineering;
    if (keyTypeEngineering && keyTypeEngineering in fieldEngineering_1.FieldEngineering)
        typeEngineering = fieldEngineering_1.FieldEngineering[keyTypeEngineering];
    else
        typeEngineering = undefined;
    //    console.log("tipo de trabalho: ", typeJob, " - tipo de engenharia: ", typeEngineering, " - Local: ", jobLocation);
    const data = yield (0, opportunities_repository_1.findAllOpportunities)(typeJob, typeEngineering, jobLocation);
    let response = null;
    if (data.length >= 1) {
        response = yield HttpResponse.ok(data);
    }
    else {
        response = yield HttpResponse.noContent();
    }
    return response;
});
exports.getOpportunitiesService = getOpportunitiesService;
const createOpportunityService = (opportunity) => __awaiter(void 0, void 0, void 0, function* () {
    let response = null;
    try {
        if (opportunity) {
            yield (0, opportunities_repository_1.insertOpportunity)(opportunity);
            response = yield HttpResponse.created();
        }
        else {
            response = yield HttpResponse.badRequest();
        }
    }
    catch (error) {
        console.error("Erro ao criar a oportunidade: ", error);
        response = yield HttpResponse.serverError();
    }
    return response;
});
exports.createOpportunityService = createOpportunityService;
