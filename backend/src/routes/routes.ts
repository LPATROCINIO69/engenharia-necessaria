import {Router,Request,Response} from "express";
import { getOpportunities, postOpportunity } from "../controllers/opportunities-controllers";
import {login,register} from "../controllers/auth-controller";

const router = Router();
router.get("/opportunities", getOpportunities); 
router.post("/opportunities",postOpportunity);
router.post("/login", login);   
router.post("/register",register);

export default router;