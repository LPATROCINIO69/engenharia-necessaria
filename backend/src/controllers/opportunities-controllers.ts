import { Request,Response } from "express";
import { getOpportunitiesService } from "../services/opportunities-service";


export const getOpportunities = async (req:Request, res:Response)=>{
    const typeJob = req.params.typeJob;
    const typeEngineering = req.params.engineering;
    const jobLocation = req.params.jobLocation;
    const response = await getOpportunitiesService(typeJob, typeEngineering, jobLocation);
    res.status(response.statusCode).json(response.body);
}