
import { scrapeInfojobs } from "../services/infojobs-service";


export const infojobsController = async () =>{
    const opportunities = await scrapeInfojobs();
    console.log(`✔ ${opportunities.length} vagas coletadas do InfoJobs.`);
    return opportunities;
}