import { Request,Response } from "express";
import { getOpportunitiesService } from "../services/opportunities-service";
import { TypeJob } from "../domain/enums/typeJob";
import { FieldEngineering } from "../domain/enums/fieldEngineering";


export const getOpportunities = async (req:Request, res:Response)=>{

    const keyTypeJob = req.query.typeJob as string | undefined;
    const keyTypeEngineering = req.query.typeEngineering as string| undefined;
    const jobLocation = req.query.jobLocation as string | undefined;
    const response = await getOpportunitiesService(keyTypeJob, keyTypeEngineering, jobLocation);
    res.status(response.statusCode).json(response.body);
}