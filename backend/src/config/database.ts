import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/engenhariaopportunity");
    console.log("✅ Conectado ao MongoDB");
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:", error);
  }
}
