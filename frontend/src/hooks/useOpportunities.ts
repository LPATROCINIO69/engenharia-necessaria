import { useEffect, useState } from "react";
import { listaOpportunities } from "../services/opportunityService";
import type { Opportunity } from "../models/OpportunitType";

export function useOpportunities(filtrar: boolean, tipoEngenharia: string, tipoTrabalho: string, estado?: string | null, cidade?: string | null,) {
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);


    useEffect(() => {
        if (!filtrar) return; // só executa se filtrar for true
        listaOpportunities(tipoEngenharia, tipoTrabalho, estado, cidade)
            .then(setOpportunities)
            .catch(console.error);
        
    }, [filtrar, tipoEngenharia, tipoTrabalho, estado, cidade]);

    return opportunities;

}