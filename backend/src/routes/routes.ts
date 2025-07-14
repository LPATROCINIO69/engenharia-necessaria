import {Router,Request,Response} from "express";
import { getOpportunities } from "../controllers/opportunities-controllers";


const router = Router();

// TO DO:  desenvolver um controller para substituir a função de callback do GET.
// Lista vagas por tipo={trainee, job}, modalidade {engenharia mecânica, engenharia civil, engenharia elétrica, etc.} 
// e local {São Paulo, Brasília, Rio de Janeiro, etc.}.
router.get("/opportunities", getOpportunities);    



export default router;