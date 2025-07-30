import { infojobsAdapter } from "../adapters/infojobs-adapter";
import { infojobsMapper } from "../mappers/infojobs-mapper";
import { insertOpportunity } from "../repositories/opportunities-repository";
import { OpportunityModel } from "../models/opportunity-schema";


export const scrapeInfojobs = async () =>{
    const opportunities = await infojobsAdapter("Engenheiro Mecanico");   // EM TESTE
//    const opportunities: OpportunityModel[] = await Promise.all(rawData.map(item=>infojobsMapper(item))); 
/*     try{
        await OpportunityModel.insertMany(opportunities);
        
    } catch(error){
        console.error("Erro ao criar a oportunidade: ", error);
    } */
    return opportunities;
};
