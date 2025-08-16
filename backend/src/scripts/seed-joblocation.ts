import mongoose from "mongoose";
import axios from "axios";
import JobLocation from "../models/joblocation-schema";


async function fetchCidadesDoIBGE() {
  const url = "https://servicodados.ibge.gov.br/api/v1/localidades/municipios";
  const { data } = await axios.get(url);

  // Normalizar dados no formato { cidade, estado, codigoIbge }
  return data
    .map((m: any) => {
      const estado = m?.microrregiao?.mesorregiao?.UF?.sigla;
      return estado
        ? {
            cidade: m.nome,
            estado,
            codigoIbge: m.id
          }
        : null;
    })
    .filter(Boolean); // remove nulls
}

async function seed() {
  try {
    await mongoose.connect("mongodb://localhost:27017/engenhariaopportunity"); // troque seu banco
    console.log("✅ Conectado ao MongoDB");

    console.log("📡 Baixando lista de cidades do IBGE...");
    const listaCidades = await fetchCidadesDoIBGE();
    console.log(`📌 Recebidas ${listaCidades.length} cidades`);

    await JobLocation.deleteMany({});
    console.log("🗑️ Coleção 'joblocation' limpa");

    await JobLocation.insertMany(listaCidades);
    console.log("✅ Seed concluído com sucesso!");

    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Erro no seed:", err);
    mongoose.disconnect();
  }
}

seed();