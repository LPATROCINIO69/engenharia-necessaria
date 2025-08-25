import { FieldEngineering } from "../domain/enums/fieldEngineering";
import { TypeJob } from "../domain/enums/typeJob";
import { Opportunity as OpportunityModel } from "../models/opportunity-model";
import { findAllOpportunities, insertOpportunity } from "../repositories/opportunities-repository";
import * as HttpResponse from "../utils/http-helper";

export const getOpportunitiesService = async (keyTypeJob?:string, keyTypeEngineering?:string, jobLocation?:string) =>{
    
    let typeJob;
    if (keyTypeJob && keyTypeJob.toUpperCase() in TypeJob) typeJob = TypeJob[keyTypeJob.toUpperCase() as keyof typeof TypeJob];
        else typeJob = undefined;

    let typeEngineering;
    if (keyTypeEngineering && keyTypeEngineering in FieldEngineering) typeEngineering = FieldEngineering[keyTypeEngineering as keyof typeof FieldEngineering];
        else typeEngineering = undefined;

//    console.log("tipo de trabalho: ", typeJob, " - tipo de engenharia: ", typeEngineering, " - Local: ", jobLocation);
    const data = await findAllOpportunities(typeJob,typeEngineering,jobLocation);
    let response = null;

    if (data.length >= 1){
        response = await HttpResponse.ok(data);
    } else {
        response = await HttpResponse.noContent();
    }
    return response ;
}

export const createOpportunityService = async (opportunity:OpportunityModel)=>{
    let response = null;
    try{
        if (opportunity) {
            await insertOpportunity(opportunity);
            response = await HttpResponse.created();
        } else {
            response = await HttpResponse.badRequest();
        }
    } catch(error){
        console.error("Erro ao criar a oportunidade: ", error);
        response = await HttpResponse.serverError();
    }
    return response;
}