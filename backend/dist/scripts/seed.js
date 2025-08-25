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
const database_1 = require("../config/database");
const opportunity_schema_1 = require("../models/opportunity-schema");
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, database_1.connectDatabase)();
        /* const opportunities = [
          {
            title: "Estágio em Engenharia Civil",
            description: "Vaga de estágio para estudantes de engenharia civil",
            typeEngineering: "Engenharia Civil",
            typeJob: "trainee",
            jobLocation: "Vitória-ES",
            requirements: "Cursando Engenharia Civil",
            benefits: "Vale transporte, bolsa estágio",
            responsabilities: "Auxiliar no setor de obras",
            data: new Date(),
            link: "https://exemplo.com/vaga1"
          },
          {
            title: "Engenheiro Civil Pleno",
            description: "Atuar na manutenção elétrica industrial",
            typeEngineering: "Engenharia Civil",
            typeJob: "job",
            jobLocation: "Serra-ES",
            requirements: "Experiência em estruturas metálicas",
            benefits: "Plano de saúde, alimentação",
            responsabilities: "Supervisão de obra civil",
            data: new Date(),
            link: "https://exemplo.com/vaga2"
          },
          {
            title: "Engenheiro Eletricista Pleno",
            description: "Atuar na manutenção elétrica industrial",
            typeEngineering: "Engenharia Eletrica",
            typeJob: "job",
            jobLocation: "Cariacica-ES",
            requirements: "Experiência em manutenção elétrica",
            benefits: "Plano de saúde, alimentação",
            responsabilities: "Supervisão de equipe elétrica",
            data: new Date(),
            link: "https://exemplo.com/vaga2"
          },
          {
            title: "Estágio em Engenharia Elétrica",
            description: "Atuar na manutenção elétrica industrial",
            typeEngineering: "Engenharia Eletrica",
            typeJob: "trainee",
            jobLocation: "Vila Velha-ES",
            requirements: "Estudante no 7o. periodo de engenharia elétrica",
            benefits: "Plano de saúde, alimentação",
            responsabilities: "auxiliar na manutenção de instalações elétricas",
            data: new Date(),
            link: "https://exemplo.com/vaga2"
          },
          {
            title: "Estágio em Engenharia Mecânica",
            description: "Atuar na manutenção de mecânica industrial",
            typeEngineering: "Engenharia Mecanica",
            typeJob: "trainee",
            jobLocation: "Vila Velha-ES",
            requirements: "Estudante no 7o. periodo de engenharia Mecânica",
            benefits: "Plano de saúde, alimentação",
            responsabilities: "auxiliar na manutenção de motores de combustão",
            data: new Date(),
            link: "https://exemplo.com/vaga2"
          },
           {
            title: "Vaga de Engenhero Mecânico Júnior",
            description: "Atuar na manutenção de mecânica industrial",
            typeEngineering: "Engenharia Mecanica",
            typeJob: "job",
            jobLocation: "Vila Velha-ES",
            requirements: "fluente em CFD",
            benefits: "Plano de saúde, alimentação",
            responsabilities: "Projeto de turbinas e instalações hidráulicas",
            data: new Date(),
            link: "https://exemplo.com/vaga2"
          }
        ]; */
        const opportunities = [{
                title: 'Projetista Mecânico',
                description: 'Projetista Mecânico:\n' +
                    '\n' +
                    '· Desenvolver novos projetos/máquinas mediante estratégias de negócio;\n' +
                    '\n' +
                    '· Calcular e dimensionar componentes e mecanismos dos novos projetos;\n' +
                    '\n' +
                    '· Acompanhar junto a produção a fabricação e montagem da máquina, garantindo que todos os sistemas funcionem de acordo com o projeto;\n' +
                    '\n' +
                    '· Acompanhar a montagem e o startup da máquina junto ao cliente, garantindo eficiência do novo projeto;\n' +
                    '\n' +
                    '· Determinar as matérias primas aplicadas nos projetos;\n' +
                    '\n' +
                    '· Estudo de viabilidade técnica de novos projetos alinhado a estratégias de mercado;\n' +
                    '\n' +
                    '· Responsável por normatizar os projetos conforme NR\n' +
                    '\n' +
                    '· Fazer especificações técnicas, normas de componentes mecânicos e materiais;\n' +
                    '\n' +
                    '· Fazer visitas técnicas a fornecedores e clientes;\n' +
                    '\n' +
                    '· Elaborar manual técnico dos novos equipamentos/produtos desenvolvidos;\n' +
                    '\n' +
                    '· Responsável por organizar e manter limpo seu posto de trabalho, seguindo as normas de segurança e qualidade (5S);\n' +
                    '\n' +
                    'Dar suporte em demais atividades do setor.\n' +
                    '\n' +
                    'Tipo de vaga: Tempo integral, Efetivo CLT\n' +
                    '\n' +
                    'Salário inicial a partir de R$ 6.000',
                typeEngineering: 'Engenharia Mecanica',
                typeJob: 'job',
                jobLocation: 'Itajaí - SC',
                requirements: 'Escolaridade Mínima:  Curso Técnico',
                benefits: 'Assistência médica\n' +
                    '\n' +
                    'Assistência odontológica\n' +
                    '\n' +
                    'Estacionamento gratuito\n' +
                    '\n' +
                    'Participação nos lucros\n' +
                    '\n' +
                    'Seguro de vida\n' +
                    '\n' +
                    'Vale-alimentação\n' +
                    '\n' +
                    'Assiduidade',
                responsabilities: 'Projetista Mecânico:\n' +
                    '\n' +
                    '· Desenvolver novos projetos/máquinas mediante estratégias de negócio;\n' +
                    '\n' +
                    '· Calcular e dimensionar componentes e mecanismos dos novos projetos;\n' +
                    '\n' +
                    '· Acompanhar junto a produção a fabricação e montagem da máquina, garantindo que todos os sistemas funcionem de acordo com o projeto;\n' +
                    '\n' +
                    '· Acompanhar a montagem e o startup da máquina junto ao cliente, garantindo eficiência do novo projeto;\n' +
                    '\n' +
                    '· Determinar as matérias primas aplicadas nos projetos;\n' +
                    '\n' +
                    '· Estudo de viabilidade técnica de novos projetos alinhado a estratégias de mercado;\n' +
                    '\n' +
                    '· Responsável por normatizar os projetos conforme NR\n' +
                    '\n' +
                    '· Fazer especificações técnicas, normas de componentes mecânicos e materiais;\n' +
                    '\n' +
                    '· Fazer visitas técnicas a fornecedores e clientes;\n' +
                    '\n' +
                    '· Elaborar manual técnico dos novos equipamentos/produtos desenvolvidos;\n' +
                    '\n' +
                    '· Responsável por organizar e manter limpo seu posto de trabalho, seguindo as normas de segurança e qualidade (5S);\n' +
                    '\n' +
                    'Dar suporte em demais atividades do setor.\n' +
                    '\n' +
                    'Tipo de vaga: Tempo integral, Efetivo CLT\n' +
                    '\n' +
                    'Salário inicial a partir de R$ 6.000',
                data: "2025-07-31T16:30:04.533Z",
                link: 'https://www.infojobs.com.br/vaga-de-projetista-mecanico-em-santa-catarina__10794641.aspx'
            }];
        yield opportunity_schema_1.OpportunityModel.insertMany(opportunities);
        console.log("✅ Banco populado com sucesso!");
        process.exit(); // Fecha o script
    });
}
seedDatabase().catch(error => {
    console.error("❌ Erro ao popular banco:", error);
    process.exit(1);
});
