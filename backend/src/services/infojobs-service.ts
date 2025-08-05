import { infojobsAdapter } from "../adapters/infojobs-adapter";
import { OpportunityModel } from "../models/opportunity-schema";
import { Opportunity } from "../models/opportunity-model";
import { FieldEngineering } from "../domain/enums/fieldEngineering";
import { getAliasesByField } from "../mappers/fieldEngineerMapper";



export const scrapeInfojobs = async () => {

    const keys = Object.keys(FieldEngineering) as Array<keyof typeof FieldEngineering>;
    let opportunities: Opportunity[] = [];

    for (const keySelected of keys) {
        const aliases = getAliasesByField(FieldEngineering[keySelected]);

        for (const searchedText of aliases) {
            const results = await infojobsAdapter(searchedText);
            opportunities = [...opportunities, ...results];
            //              opportunities = await infojobsAdapter(searchedText);
        }



    }

    // try{
    //     await OpportunityModel.insertMany(opportunities);

    // } catch(error){
    //     console.error("Erro ao criar a oportunidade: ", error);
    // } 

    console.log('quantidade de registros:', opportunities.length);

    for (const opp of opportunities) {
        try {
            await OpportunityModel.create(opp);
        } catch (err) {
            const error = err as any;
            if (error.code === 11000) {
                console.warn("Duplicata:", opp.link);
            } else {
                console.error("Erro ao salvar:", error);
            }
        }
    }

    return opportunities;
};
