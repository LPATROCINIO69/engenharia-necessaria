import { useEffect, useState } from "react";
import { listaStatesService } from "../services/statesService";

export function useEstados() {
    const [estados, setEstados] = useState<string[]>([]);
    
    useEffect(() => {
        listaStatesService()
            .then(setEstados)
            .catch(console.error);
    }, []);

    return estados;
}