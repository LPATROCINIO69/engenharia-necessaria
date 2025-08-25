import mongoose from "mongoose";
import  Engineering from "../models/engineering-schema";
import { FieldEngineering } from "../domain/enums/fieldEngineering";

async function seedEngineering() {
  try {
    await mongoose.connect("mongodb://localhost:27017/engenhariaopportunity"); // ajuste a URL
    console.log("✅ Conectado ao MongoDB");

    // Converte enum para array de objetos { key, name }
    const engineeringArray = Object.entries(FieldEngineering).map(([key, value]) => ({
      key,
      name: value
    }));

    console.log("📋 Engenharias encontradas:", engineeringArray.length);

    // Limpa a coleção antes
    await Engineering.deleteMany({});
    console.log("🗑️ Coleção 'engineering' limpa");

    // Insere no banco
    await Engineering.insertMany(engineeringArray);
    console.log("✅ Engenharias inseridas com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao popular engenharias:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedEngineering();
