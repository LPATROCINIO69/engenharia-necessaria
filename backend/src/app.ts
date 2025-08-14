import express,{json} from "express";
import routes from "./routes/routes";
import cors from 'cors';

function createApp(){
    const app = express();

    // Configuração do CORS (adicionar aqui, antes das rotas)
    app.use(cors({
        origin: '*', // Permite qualquer frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
        allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
//        credentials: true // Habilita cookies/tokens (se necessário)
    }));

    app.use(json());
    app.use('/api',routes);
    return app;
}

export default createApp;