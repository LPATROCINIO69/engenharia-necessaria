
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { HeaderPage } from "../components/HeaderPage";
import { ListBoxCustom } from "../components/ListBoxCustom";
import { TipoTrabalhoSelector } from "../components/TipoTrabalhoSeletor";

import '../styles/Oportunidades.css';
import { listaStatesService } from "../services/statesService";
import { useEffect, useState } from "react";
import { listaEngineeringService } from "../services/engineeringService";
import { listaCitiesService } from "../services/cityService";



export function Oportunidades() {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/divulgar');
    };

    // armazena os valores selecionados
    const [estadoSelecionado, setEstadoSelecionado] = useState<string | null>(null);
    const [engenhariaSelecionada, setEngenhariaSelecionada] = useState<string | null>(null);
    const [cidadeSelecionada, setCidadeSelecionada] = useState<string | null>(null);
    const [cidades, setCidades] = useState<string[]>([]);

    // TO DO: Resgatar conteúdos para as LISTBOX
    const [engenharias, setEngenharias] = useState<string[]>([]);      //["Engenharia Mecânica", "Engenharia Civil", "Engenharia Elétrica"];
    useEffect(() => {
        listaEngineeringService()
            .then(setEngenharias)
            .catch(console.error)
    }, []);

    const [estados, setEstados] = useState<string[]>([]);
    useEffect(() => {
        listaStatesService()
            .then(setEstados)
            .catch(console.error)
    }, []);

    // quando o estado mudar, buscar cidades
    useEffect(() => {
        if (!estadoSelecionado) {
            setCidades([]);
            setCidadeSelecionada(null);
            return;
        }

        let ignore = false;

        (async () => {
            try {
                const lista = await listaCitiesService(estadoSelecionado);
                if (!ignore) {
                    setCidades(lista);
                    setCidadeSelecionada(null); // reseta a cidade selecionada
                }
            } catch (e) {
                if (!ignore) console.error(e);
            }
        })();

        return () => {
            ignore = true;
        };
    }, [estadoSelecionado]);



    const vagas = [
        { titulo: "Engenheiro Civil", empresa: "Construtora Catanduva", local: "São Paulo - SP" },
        { titulo: "Supervisor Geral", empresa: "Alias Arquitetura", local: "São Bernardo - SP" },
        { titulo: "Arquiteto", empresa: "Beta Engenharia", local: "Curitiba - PR" },
        { titulo: "Técnico de Obras", empresa: "Construtora Delta", local: "Campinas - SP" }
    ];



    return (
        <div className="oportunidades-container">
            <HeaderPage />
            <form onSubmit={handleSubmit} className="oportunidades-form">
                <h2>Oportunidades</h2>

                <ListBoxCustom
                    dados={engenharias}
                    renderItem={(item) => <span>{item}</span>}
                    label="Campo da Engenharia"
                    onChange={(engenharia) => setEngenhariaSelecionada(engenharia)}
                />

                <ListBoxCustom
                    dados={estados}
                    renderItem={(item) => <span>{item}</span>}
                    label="Estado (UF)"
                    onChange={(estado) => setEstadoSelecionado(estado)}
                />

                <ListBoxCustom
                    dados={cidades}
                    renderItem={(item) => <span>{item}</span>}
                    label="Cidade"
                    onChange={(cidade) => setCidadeSelecionada(cidade)}
                />

                <TipoTrabalhoSelector />

                <ListBoxCustom
                    dados={vagas}
                    renderItem={(vaga) => <span>
                        <strong>{vaga.titulo}</strong><br />
                        {vaga.empresa}<br />
                        {vaga.local}</span>}
                    maxVisibleItems={3}
                    onItemDoubleClick={() => navigate('/detalhe')}
                />


                <Button type="submit">Divulgar Oportunidades</Button>
            </form>

        </div >


    );


}