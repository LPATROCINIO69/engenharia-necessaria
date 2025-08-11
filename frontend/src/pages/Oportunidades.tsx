
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { HeaderPage } from "../components/HeaderPage";
import { ListBoxCustom } from "../components/ListBoxCustom";
import { TipoTrabalhoSelector } from "../components/TipoTrabalhoSeletor";

import '../styles/Oportunidades.css';



export function Oportunidades() {
    const navigate = useNavigate();

    
    // TO DO: Resgatar conteúdos para as LISTBOX
    const cidades = ["São Paulo - SP", "Rio de Janeiro - RJ", "Curitiba - PR"];
    const engenharias = ["Engenharia Mecânica", "Engenharia Civil", "Engenharia Elétrica"];

    const vagas = [
        { titulo: "Engenheiro Civil", empresa: "Construtora Catanduva", local: "São Paulo - SP" },
        { titulo: "Supervisor Geral", empresa: "Alias Arquitetura", local: "São Bernardo - SP" },
        { titulo: "Arquiteto", empresa: "Beta Engenharia", local: "Curitiba - PR" },
        { titulo: "Técnico de Obras", empresa: "Construtora Delta", local: "Campinas - SP" }
    ];



    return (
        <div className="oportunidades-container">
            <HeaderPage />
            <h2>Oportunidades</h2>

            <ListBoxCustom
                dados={engenharias}
                renderItem={(item) => <span>{item}</span>}
                label="Campo da Engenharia"
                
            />

            <ListBoxCustom
                dados={cidades}
                renderItem={(item) => <span>{item}</span>}
                label="Local de atuação"
            />

            <TipoTrabalhoSelector />

            <ListBoxCustom
                dados={vagas}
                renderItem={(vaga) => <span>
                    <strong>{vaga.titulo}</strong><br />
                    {vaga.empresa}<br />
                    {vaga.local}</span>}
                maxVisibleItems={3}
                onItemDoubleClick={()=> navigate('/detalhe')}
            />


            <Button type="submit">Divulgar Oportunidades</Button>


        </div >


    );


}