import React,{useState} from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { TextViewCustom } from "../components/TextViewCustom";
import { HeaderPage } from "../components/HeaderPage";

import '../styles/DivulgacaoOportunidade.css';
import { useNavigate } from "react-router-dom";
import { ListBoxCustom } from "../components/ListBoxCustom";
import { TipoTrabalhoSelector } from "../components/TipoTrabalhoSeletor";
import { useEngenharias } from "../hooks/useEngenharias";
import { useEstados } from "../hooks/useEstados";
import { useCidades } from "../hooks/useCidades";

// TO DO: Resgatar conteúdos para as LISTBOX
const cidades = ["São Paulo - SP", "Rio de Janeiro - RJ", "Curitiba - PR"];
const engenharias = ["Engenharia Mecânica", "Engenharia Civil", "Engenharia Elétrica"];


export function DivulgacaoOportunidade() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [engineering, setEngineering] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [state, setState]    = useState("");
    const [city, setCity]      = useState("");
    const [typeJob, setTypeJob] = useState("");
    const [linkJob, setLinkJob] = useState("");

    // carregando dados para as listbox
    const engenharias = useEngenharias();
    const estados = useEstados();
    const cidades = useCidades(state);
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //        navigate('/oportunidades');

        // Teste de link

    };

    return (
        <div className="divulgacao-container">

            <HeaderPage />

            <form onSubmit={handleSubmit} className="divulgacao-form">
                <h2>Divulgar Oportunidade</h2>
                <Input
                    label="Título"
                    type="text"
                    placeholder="Titulo da oportunidade"
                    value={title}
                    onChange={e =>setTitle(e.target.value)}
                />

                <TextViewCustom
                    editable={true}
                    label="Descrição"
                    className="textview-container"
                    height={100}
                    text={""}
                    onChange={(textoDigitado) => setDescription(textoDigitado) }
                    
                />

                <ListBoxCustom
                    dados={engenharias}
                    renderItem={(item) => <span>{item.name}</span>}
                    label="Campo da Engenharia"
                    onChange={(item)=>setEngineering(item.key)}
                    
                />

                <ListBoxCustom
                    dados={estados}
                    renderItem={(item) => <span>{item}</span>}
                    label="Estado (UF)"
                    onChange={(item) => setState(item)}
                />

                <ListBoxCustom
                    dados={cidades}
                    renderItem={(item) => <span>{item}</span>}
                    label="Cidade"
                    onChange={(item) => setCity(item)}
                />

              
                <TipoTrabalhoSelector onChange={setTypeJob} />

                 <Input
                    label="Link para vaga"
                    type="url"
                    placeholder="http://www.google.com.br"
                    value = {linkJob}
                    onChange={e =>setLinkJob(e.target.value)}
                />

                <Button type="submit">Cadastrar Oportunidade</Button>


            </form>


        </div>


    );


}