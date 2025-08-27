import createApp from "./app";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";

dotenv.config();

const app = createApp();
const port = parseInt(process.env.PORT || '3000', 10);

connectDatabase().then(() => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`✅ Server rodando em ${port}`);
  });
}).catch((error) => {
  console.error("❌ Falha ao conectar ao banco de dados:", error);
});