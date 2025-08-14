import createApp from "./app";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";

dotenv.config();

const app = createApp();
const port = process.env.PORT || 3000;

connectDatabase().then(() => {
  app.listen(port, () => {
    console.log(`✅ Server rodando em http://localhost:${port}`);
  });
}).catch((error) => {
  console.error("❌ Falha ao conectar ao banco de dados:", error);
});