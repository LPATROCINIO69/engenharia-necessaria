import { Request,Response } from "express";
import { createOpportunityService, getOpportunitiesService } from "../services/opportunities-service";



export const getOpportunities = async (req:Request, res:Response)=>{

    const keyTypeJob = req.query.typeJob as string | undefined;
    const keyTypeEngineering = req.query.typeEngineering as string| undefined;
    const jobLocation = req.query.jobLocation as string | undefined;
    const response = await getOpportunitiesService(keyTypeJob, keyTypeEngineering, jobLocation);
//    res.status(response.statusCode).json(response.body);

    if(response.statusCode === 204){
        res.status(204).send(null); // força enviar null
    } else {
        res.status(response.statusCode).json(response.body);
    }

}

export const postOpportunity = async (req:Request, res:Response)=>{
    const opportunityData = req.body;
    const response = await createOpportunityService(opportunityData);
    res.status(response.statusCode).json(response.body);
}