import { connectDatabase } from "../config/database";
import { OpportunityModel } from "../models/opportunity-schema";

async function seedDatabase() {
  await connectDatabase();

  const opportunities = [
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
  ];

  await OpportunityModel.insertMany(opportunities);
  console.log("✅ Banco populado com sucesso!");
  process.exit(); // Fecha o script
}

seedDatabase().catch(error => {
  console.error("❌ Erro ao popular banco:", error);
  process.exit(1);
});