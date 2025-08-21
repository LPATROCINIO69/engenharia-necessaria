// gerarDicionarioCompleto.js
import { MongoClient } from "mongodb";
import fs from "fs";

const uri = "mongodb://localhost:27017"; // ajuste para seu MongoDB
const dbName = "engenhariaopportunity";               // nome do banco
const sampleLimit = 500;                  // quantidade de documentos para análise

const client = new MongoClient(uri);

function getType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "Array";
  return typeof value === "object" && value._bsontype === "ObjectID"
    ? "ObjectId"
    : typeof value;
}

async function analyzeCollection(db, collectionName) {
  const collection = db.collection(collectionName);
  const docs = await collection.find().limit(sampleLimit).toArray();

  const schema = {};

  docs.forEach((doc) => {
    Object.keys(doc).forEach((key) => {
      const type = getType(doc[key]);
      if (!schema[key]) {
        schema[key] = { types: new Set(), count: 0 };
      }
      schema[key].types.add(type);
      schema[key].count += 1;
    });
  });

  // gerar tabela Markdown para a coleção
  let markdown = `## Coleção: ${collectionName}\n\n`;
  markdown += "| Campo | Tipos | Obrigatório | Exemplo |\n";
  markdown += "|-------|-------|------------|--------|\n";

  Object.keys(schema).forEach((key) => {
    const types = Array.from(schema[key].types).join(", ");
    const required = schema[key].count === docs.length ? "Sim" : "Não";
    const example = JSON.stringify(docs.find(d => d[key] !== undefined)?.[key]);
    markdown += `| ${key} | ${types} | ${required} | ${example} |\n`;
  });

  markdown += "\n";
  return markdown;
}

async function main() {
  await client.connect();
  const db = client.db(dbName);

  const collections = await db.listCollections().toArray();
  let finalMarkdown = `# Dicionário de Dados - Banco ${dbName}\n\n`;

  for (const col of collections) {
    finalMarkdown += await analyzeCollection(db, col.name);
  }

  fs.writeFileSync("README_dicionario.md", finalMarkdown);
  console.log("Dicionário de dados completo gerado: README_dicionario.md");

  await client.close();
}

main().catch(console.error);

