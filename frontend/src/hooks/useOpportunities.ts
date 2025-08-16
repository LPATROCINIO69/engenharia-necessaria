import { useEffect, useState } from "react";
import { listaCitiesService } from "../services/cityService";

export function useOpportunities(tipoEngenharia:string, tipoTrabalho:string, estado?:string|null, cidade?:string|null ) {
    const [opportunities, setOpportunities] = useState<string[]>([]);

    useEffect(() => {
        if (!estadoSelecionado) {
            setCidades([]);
            return;
        }

        let ignore = false;

        listaOpportunities(tipoEngenharia, tipoTrabalho, estado, cidade);
            .then((lista) => {
                if (!ignore) setCidades(lista);
            })
            .catch((err) => { if (!ignore) console.error(err) });

        return () => { ignore = true; }
    }, [estadoSelecionado]);

    return cidades;
}