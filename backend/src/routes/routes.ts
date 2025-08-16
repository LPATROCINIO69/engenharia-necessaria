import {Router} from "express";
import { getOpportunities, postOpportunity } from "../controllers/opportunities-controllers";
import {login,register} from "../controllers/auth-controller";
import { getStates } from "../controllers/states-controller";
import { getEngineering } from "../controllers/engineering-controller";
import { getCities } from "../controllers/cities-controller";

const router = Router();
router.get("/opportunities", getOpportunities); 
router.post("/opportunities",postOpportunity);
router.post("/login", login);   
router.post("/register",register);

router.get("/engineering", getEngineering);
router.get("/states", getStates);
router.get("/cities",getCities);


export default router;