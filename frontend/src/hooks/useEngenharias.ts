import { useEffect, useState } from "react";
import { listaEngineeringService } from "../services/engineeringService";
import type { FieldEngineeringType } from "../models/FieldEngineeringType";

export function useEngenharias() {
    const [engenharias, setEngenharias] = useState<FieldEngineeringType[]>([]);
    
    useEffect(() => {
        listaEngineeringService()
            .then(setEngenharias)
            .catch(console.error);
    }, []);

    return engenharias;
}
