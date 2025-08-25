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
exports.infojobsMapper = void 0;
// TO DO: verificar cada um desses campos. Alguns deles terão que ser definidos de outra forma.
const infojobsMapper = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        title: data.title,
        description: data.description,
        typeEngineering: data.typeEngineering,
        typeJob: data.typeJob,
        jobLocation: data.jobLocation,
        requirements: data.requirements,
        benefits: data.benefits,
        responsabilities: data.responsabilities,
        data: new Date(),
        link: data.link
    };
});
exports.infojobsMapper = infojobsMapper;
