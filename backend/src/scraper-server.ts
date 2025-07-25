import dotenv from "dotenv";
dotenv.config();

import { connectDatabase } from "./config/database";
import { infojobsController}  from "./controllers/infojobs-controller";


async function runScrapers() {
  try {
    await connectDatabase();
    console.log("🟢 Banco de dados conectado com sucesso!");

    // Execute os scrapers desejados
    const opportunities = await infojobsController();      // coleta oportunidades de estágio e emprego para gravar no MongoDB

    console.log("✅ Scraping finalizado com sucesso.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao executar scrapers:", error);
    process.exit(1);
  }
}

runScrapers();