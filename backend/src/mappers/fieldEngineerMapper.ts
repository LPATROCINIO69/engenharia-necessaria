import { FieldEngineering } from "../domain/enums/fieldEngineering";

const engineeringAliasMap: Record<string, FieldEngineering> = {
   // Engenharia Civil
  "Engenharia Civil": FieldEngineering.Civil,
  "Engenheiro Civil": FieldEngineering.Civil,
  "Estagiário em Engenharia Civil": FieldEngineering.Civil,

  // Engenharia Mecânica
  "Engenharia Mecanica": FieldEngineering.Mecanica,
  "Engenheiro Mecanico": FieldEngineering.Mecanica,
  "Estagiário em Engenharia Mecanica": FieldEngineering.Mecanica , 

  // Engenharia Elétrica
  "Engenharia Eletrica": FieldEngineering.Eletrica,
  "Engenheiro Eletrico": FieldEngineering.Eletrica,
  "Estagiário em Engenharia Eletrica": FieldEngineering.Eletrica,

  // // Engenharia Eletrônica
  // "Engenharia Eletronica": FieldEngineering.Eletronica,
  // "Engenheiro Eletronico": FieldEngineering.Eletronica,
  // "Estagiário em Engenharia Eletronica": FieldEngineering.Eletronica,

  //  // Engenharia de Produção
  // "Engenharia de Producao": FieldEngineering.Producao,
  // "Engenheiro de Producao": FieldEngineering.Producao,
  // "Estagiário em Engenharia de Producao": FieldEngineering.Producao,

  // // Engenharia da Computação
  // "Engenharia da Computacao": FieldEngineering.Computacao,
  // "Engenheiro de Computacao": FieldEngineering.Computacao,
  // "Estagiário em Engenharia da Computacao": FieldEngineering.Computacao,

  // // Engenharia Química
  // "Engenharia Quimica": FieldEngineering.Quimica,
  // "Engenheiro Quimico": FieldEngineering.Quimica,
  // "Estagiário em Engenharia Quimica": FieldEngineering.Quimica,

  // Engenharia Ambiental
  "Engenharia Ambiental": FieldEngineering.Ambiental,
  "Engenheiro Ambiental": FieldEngineering.Ambiental,
  "Estagiário em Engenharia Ambiental": FieldEngineering.Ambiental,

  // // Engenharia de Alimentos
  // "Engenharia de Alimentos": FieldEngineering.Alimentos,
  // "Engenheiro de Alimentos": FieldEngineering.Alimentos,
  // "Estagiário em Engenharia de Alimentos": FieldEngineering.Alimentos,

  // // Engenharia Agronômica
  // "Engenharia Agronomica": FieldEngineering.Agronoma,
  // "Engenheiro Agronomo": FieldEngineering.Agronoma,
  // "Estagiário em Engenharia Agronomica": FieldEngineering.Agronoma,

  // // Engenharia Florestal
  // "Engenharia Florestal": FieldEngineering.Florestal,
  // "Engenheiro Florestal": FieldEngineering.Florestal,
  // "Estagiário em Engenharia Florestal": FieldEngineering.Florestal,

  // // Engenharia de Petróleo
  // "Engenharia de Petroleo": FieldEngineering.Petroleo,
  // "Engenheiro de Petroleo": FieldEngineering.Petroleo,
  // "Estagiário em Engenharia de Petroleo": FieldEngineering.Petroleo,

  // // Engenharia Biomédica
  // "Engenharia Biomedica": FieldEngineering.Biomedica,
  // "Engenheiro Biomedico": FieldEngineering.Biomedica,
  // "Estagiário em Engenharia Biomedica": FieldEngineering.Biomedica,

  // // Engenharia de Telecomunicações
  // "Engenharia de Telecomunicacoes": FieldEngineering.Telecomunicacoes,
  // "Engenheiro de Telecomunicacoes": FieldEngineering.Telecomunicacoes,
  // "Estagiário em Engenharia de Telecomunicacoes": FieldEngineering.Telecomunicacoes,

  // // Engenharia Naval
  // "Engenharia Naval": FieldEngineering.Naval,
  // "Engenheiro Naval": FieldEngineering.Naval,
  // "Estagiário em Engenharia Naval": FieldEngineering.Naval,

  // // Engenharia Aeronáutica
  // "Engenharia Aeronautica": FieldEngineering.Aeronautica,
  // "Engenheiro Aeronautico": FieldEngineering.Aeronautica,
  // "Estagiário em Engenharia Aeronautica": FieldEngineering.Aeronautica,

  // // Engenharia Nuclear
  // "Engenharia Nuclear": FieldEngineering.Nuclear,
  // "Engenheiro Nuclear": FieldEngineering.Nuclear,
  // "Estagiário em Engenharia Nuclear": FieldEngineering.Nuclear,

  // // Engenharia de Materiais
  // "Engenharia de Materiais": FieldEngineering.Materiais,
  // "Engenheiro de Materiais": FieldEngineering.Materiais,
  // "Estagiário em Engenharia de Materiais": FieldEngineering.Materiais,

  // // Engenharia Sanitária
  // "Engenharia Sanitaria": FieldEngineering.Sanitaria,
  // "Engenheiro Sanitario": FieldEngineering.Sanitaria,
  // "Estagiário em Engenharia Sanitaria": FieldEngineering.Sanitaria,  
};

// retorna o campo de engenharia correspondente a string descritiva
export function mapToFieldEngineering(raw: string): FieldEngineering {
  return engineeringAliasMap[raw];
}

// retorna o vetor de strings descritivas a partir de um campo de engenharia
export function getAliasesByField(field: FieldEngineering): string[] {
  return Object.entries(engineeringAliasMap)
    .filter(([, enumValue]) => enumValue === field)
    .map(([alias]) => alias);
}