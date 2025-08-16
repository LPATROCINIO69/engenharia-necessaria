import { useEffect, useState } from "react";
import { listaCitiesService } from "../services/cityService";

export function useCidades(estadoSelecionado: string | null) {
    const [cidades, setCidades] = useState<string[]>([]);

    useEffect(() => {
        if (!estadoSelecionado) {
            setCidades([]);
            return;
        }

        let ignore = false;

        listaCitiesService(estadoSelecionado)
            .then((lista) => {
                if (!ignore) setCidades(lista);
            })
            .catch((err) => { if (!ignore) console.error(err) });

        return () => { ignore = true; }
    }, [estadoSelecionado]);

    return cidades;
}