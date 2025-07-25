import { infojobsAdapter } from "../adapters/infojobs-adapter";
import { infojobsMapper } from "../mappers/infojobs-mapper";
import { insertOpportunity } from "../repositories/opportunities-repository";
import { Opportunity } from "../models/opportunity-model";


export const scrapeInfojobs = async () =>{
    const rawData = await infojobsAdapter();
    const opportunities: Opportunity[] = await Promise.all(rawData.map(item=>infojobsMapper(item))); 
    
    opportunities.forEach((item)=>{insertOpportunity(item)});
    return opportunities;
};
