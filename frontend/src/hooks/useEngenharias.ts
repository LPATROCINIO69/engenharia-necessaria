import { useEffect, useState } from "react";
import { listaEngineeringService } from "../services/engineeringService";

export function useEngenharias() {
    const [engenharias, setEngenharias] = useState<string[]>([]);
    
    useEffect(() => {
        listaEngineeringService()
            .then(setEngenharias)
            .catch(console.error);
    }, []);

    return engenharias;
}
