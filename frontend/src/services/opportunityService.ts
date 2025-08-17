import { apiConfig } from "../config/apiConfig";
import type { Opportunity } from "../models/opportunitType";


export const listaOpportunities = async (engenharia:string, tipoTrabalho:string, estado?:string|null, cidade?:string|null)
    : Promise<Opportunity[]> =>{
     try {
            let jobLocation:string="";
            let url = `${apiConfig.opportunities}?typeJob=${encodeURIComponent(tipoTrabalho)}&typeEngineering=${encodeURIComponent(engenharia)}`;
            if ((estado!==null) && (cidade!==null) ){
                jobLocation = cidade + ' - ' + estado;
                url = `${url}&jobLocation=${encodeURIComponent(jobLocation)}`;
            }
            console.log(url);
            
            const response = await fetch(url, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
    
            const opportunities = await response.json(); // Adicionado 'await' aqui
            return opportunities;
        } catch (error) {
            console.error('Erro ao buscar estados:', error);
            throw error; // Rejeita a promise para ser tratada pelo chamador
        }    
}