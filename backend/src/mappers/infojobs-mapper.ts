import { Opportunity } from "../models/opportunity-model";


// TO DO: verificar cada um desses campos. Alguns deles terão que ser definidos de outra forma.

export const infojobsMapper = async (data:any) : Promise<Opportunity> => {
        return {
            title: data.title,
            description: data.description,
            typeEngineering: data.typeEngineering,
            typeJob: data.typeJob,
            jobLocation: data.jobLocation,
            requirements: data.requirements,
            benefits: data.benefits,
            responsabilities:data.responsabilities,
            data: new Date(),
            link: data.link
        }
};


