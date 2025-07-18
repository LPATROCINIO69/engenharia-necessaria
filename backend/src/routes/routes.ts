import {Router,Request,Response} from "express";
import { getOpportunities, postOpportunity } from "../controllers/opportunities-controllers";


const router = Router();
router.get("/opportunities", getOpportunities); 
router.post("/opportunities",postOpportunity);   


export default router;