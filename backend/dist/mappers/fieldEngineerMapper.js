"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToFieldEngineering = mapToFieldEngineering;
exports.getAliasesByField = getAliasesByField;
const fieldEngineering_1 = require("../domain/enums/fieldEngineering");
const engineeringAliasMap = {
    // Engenharia Civil
    "Engenharia Civil": fieldEngineering_1.FieldEngineering.Civil,
    "Engenheiro Civil": fieldEngineering_1.FieldEngineering.Civil,
    "Estagiário em Engenharia Civil": fieldEngineering_1.FieldEngineering.Civil,
    // Engenharia Mecânica
    "Engenharia Mecanica": fieldEngineering_1.FieldEngineering.Mecanica,
    "Engenheiro Mecanico": fieldEngineering_1.FieldEngineering.Mecanica,
    "Estagiário em Engenharia Mecanica": fieldEngineering_1.FieldEngineering.Mecanica,
    // Engenharia Elétrica
    "Engenharia Eletrica": fieldEngineering_1.FieldEngineering.Eletrica,
    "Engenheiro Eletrico": fieldEngineering_1.FieldEngineering.Eletrica,
    "Engenheiro Eletricista": fieldEngineering_1.FieldEngineering.Eletrica,
    "Estagiário em Engenharia Eletrica": fieldEngineering_1.FieldEngineering.Eletrica,
    // // Engenharia Eletrônica
    "Engenharia Eletronica": fieldEngineering_1.FieldEngineering.Eletronica,
    "Engenheiro Eletronico": fieldEngineering_1.FieldEngineering.Eletronica,
    "Estagiário em Engenharia Eletronica": fieldEngineering_1.FieldEngineering.Eletronica,
    //  // Engenharia de Produção
    "Engenharia de Producao": fieldEngineering_1.FieldEngineering.Producao,
    "Engenheiro de Producao": fieldEngineering_1.FieldEngineering.Producao,
    "Estagiário em Engenharia de Producao": fieldEngineering_1.FieldEngineering.Producao,
    // // Engenharia da Computação
    "Engenharia da Computacao": fieldEngineering_1.FieldEngineering.Computacao,
    "Engenheiro de Computacao": fieldEngineering_1.FieldEngineering.Computacao,
    "Estagiário em Engenharia da Computacao": fieldEngineering_1.FieldEngineering.Computacao,
    // // Engenharia Química
    "Engenharia Quimica": fieldEngineering_1.FieldEngineering.Quimica,
    "Engenheiro Quimico": fieldEngineering_1.FieldEngineering.Quimica,
    "Estagiário em Engenharia Quimica": fieldEngineering_1.FieldEngineering.Quimica,
    // Engenharia Ambiental
    "Engenharia Ambiental": fieldEngineering_1.FieldEngineering.Ambiental,
    "Engenheiro Ambiental": fieldEngineering_1.FieldEngineering.Ambiental,
    "Estagiário em Engenharia Ambiental": fieldEngineering_1.FieldEngineering.Ambiental,
    // // Engenharia de Alimentos
    "Engenharia de Alimentos": fieldEngineering_1.FieldEngineering.Alimentos,
    "Engenheiro de Alimentos": fieldEngineering_1.FieldEngineering.Alimentos,
    "Estagiário em Engenharia de Alimentos": fieldEngineering_1.FieldEngineering.Alimentos,
    // // Engenharia Agronômica
    "Engenharia Agronomica": fieldEngineering_1.FieldEngineering.Agronoma,
    "Engenheiro Agronomo": fieldEngineering_1.FieldEngineering.Agronoma,
    "Estagiário em Engenharia Agronomica": fieldEngineering_1.FieldEngineering.Agronoma,
    // // Engenharia Florestal
    "Engenharia Florestal": fieldEngineering_1.FieldEngineering.Florestal,
    "Engenheiro Florestal": fieldEngineering_1.FieldEngineering.Florestal,
    "Estagiário em Engenharia Florestal": fieldEngineering_1.FieldEngineering.Florestal,
    // // Engenharia de Petróleo
    "Engenharia de Petroleo": fieldEngineering_1.FieldEngineering.Petroleo,
    "Engenheiro de Petroleo": fieldEngineering_1.FieldEngineering.Petroleo,
    "Estagiário em Engenharia de Petroleo": fieldEngineering_1.FieldEngineering.Petroleo,
    // Engenharia Biomédica
    "Engenharia Biomedica": fieldEngineering_1.FieldEngineering.Biomedica,
    "Engenheiro Biomedico": fieldEngineering_1.FieldEngineering.Biomedica,
    "Estagiário em Engenharia Biomedica": fieldEngineering_1.FieldEngineering.Biomedica,
    // Engenharia de Telecomunicações
    "Engenharia de Telecomunicacoes": fieldEngineering_1.FieldEngineering.Telecomunicacoes,
    "Engenheiro de Telecomunicacoes": fieldEngineering_1.FieldEngineering.Telecomunicacoes,
    "Estagiário em Engenharia de Telecomunicacoes": fieldEngineering_1.FieldEngineering.Telecomunicacoes,
    // Engenharia Naval
    "Engenharia Naval": fieldEngineering_1.FieldEngineering.Naval,
    "Engenheiro Naval": fieldEngineering_1.FieldEngineering.Naval,
    "Estagiário em Engenharia Naval": fieldEngineering_1.FieldEngineering.Naval,
    // Engenharia Aeronáutica
    "Engenharia Aeronautica": fieldEngineering_1.FieldEngineering.Aeronautica,
    "Engenheiro Aeronautico": fieldEngineering_1.FieldEngineering.Aeronautica,
    "Estagiário em Engenharia Aeronautica": fieldEngineering_1.FieldEngineering.Aeronautica,
    // Engenharia Nuclear
    "Engenharia Nuclear": fieldEngineering_1.FieldEngineering.Nuclear,
    "Engenheiro Nuclear": fieldEngineering_1.FieldEngineering.Nuclear,
    "Estagiário em Engenharia Nuclear": fieldEngineering_1.FieldEngineering.Nuclear,
    // Engenharia de Materiais
    "Engenharia de Materiais": fieldEngineering_1.FieldEngineering.Materiais,
    "Engenheiro de Materiais": fieldEngineering_1.FieldEngineering.Materiais,
    "Estagiário em Engenharia de Materiais": fieldEngineering_1.FieldEngineering.Materiais,
    // Engenharia Sanitária
    "Engenharia Sanitaria": fieldEngineering_1.FieldEngineering.Sanitaria,
    "Engenheiro Sanitario": fieldEngineering_1.FieldEngineering.Sanitaria,
    "Engenheiro Sanitarista": fieldEngineering_1.FieldEngineering.Sanitaria,
    "Estagiário em Engenharia Sanitaria": fieldEngineering_1.FieldEngineering.Sanitaria,
};
// retorna o campo de engenharia correspondente a string descritiva
function mapToFieldEngineering(raw) {
    return engineeringAliasMap[raw];
}
// retorna o vetor de strings descritivas a partir de um campo de engenharia
function getAliasesByField(field) {
    return Object.entries(engineeringAliasMap)
        .filter(([, enumValue]) => enumValue === field)
        .map(([alias]) => alias);
}
