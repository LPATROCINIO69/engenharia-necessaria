
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { HeaderPage } from "../components/HeaderPage";
import { ListBoxCustom } from "../components/ListBoxCustom";
import { TipoTrabalhoSelector } from "../components/TipoTrabalhoSeletor";

import '../styles/Oportunidades.css';
import { useState } from "react";

import { useEngenharias } from "../hooks/useEngenharias";
import { useEstados } from "../hooks/useEstados";
import { useCidades } from "../hooks/useCidades";
import { useOpportunities } from "../hooks/useOpportunities";




export function Oportunidades() {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/divulgar');
    };


    const [estadoSelecionado, setEstadoSelecionado] = useState<string | null>(null);
    const [engenhariaSelecionada, setEngenhariaSelecionada] = useState<string>("Engenharia Mecanica");
    const [cidadeSelecionada, setCidadeSelecionada] = useState<string | null>(null);
    const [tipoTrabalhoSelecionado, setTipoTrabalhoSelecionado] = useState<string>("estagio");

    const [filtrar, setFiltrar] = useState(false);

    const engenharias = useEngenharias();
    const estados = useEstados();
    const cidades = useCidades(estadoSelecionado);


    const opportunities = useOpportunities(filtrar, engenhariaSelecionada, tipoTrabalhoSelecionado, estadoSelecionado, cidadeSelecionada);

    
    const handleFilter = () => {
        setFiltrar(prev => !prev); // dispara o efeito
    };

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

                <TipoTrabalhoSelector onChange={setTipoTrabalhoSelecionado} />
                <Button type="button" onClick={handleFilter}>Filtrar</Button>

                <ListBoxCustom
                    dados={opportunities}
                    renderItem={(vaga) => <span>
                        <strong>{vaga.title}</strong><br />
                        {"Empresa: Confidencial"}<br />
                        {vaga.jobLocation}</span>}
                    maxVisibleItems={3}
                    onItemDoubleClick={() => navigate('/detalhe')}
                />


                <Button type="submit">Divulgar Oportunidades</Button>
            </form>

        </div >


    );


}