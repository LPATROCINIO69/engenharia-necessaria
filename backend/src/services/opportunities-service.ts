import { findAllOpportunities } from "../repositories/opportunities-repository";
import * as HttpResponse from "../utils/http-helper";

export const getOpportunitiesService = async (typeJob:string, typeEngineering:string, jobLocation:string) =>{
    
    const data = await findAllOpportunities(typeJob,typeEngineering,jobLocation);
    let response = null;

    if (data){
        response = await HttpResponse.ok(data);
    } else {
        response = await HttpResponse.noContent();
    }
    return response ;
}