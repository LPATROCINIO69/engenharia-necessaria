import React, { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { TextViewCustom } from "../components/TextViewCustom";
import { HeaderPage } from "../components/HeaderPage";

import '../styles/DivulgacaoOportunidade.css';
import { ListBoxCustom } from "../components/ListBoxCustom";
import { TipoTrabalhoSelector } from "../components/TipoTrabalhoSeletor";
import { useEngenharias } from "../hooks/useEngenharias";
import { useEstados } from "../hooks/useEstados";
import { useCidades } from "../hooks/useCidades";
import { useRegisterOpportunity } from "../hooks/useRegisterOpportunity";

// TO DO: Resgatar conteúdos para as LISTBOX


export function DivulgacaoOportunidade() {
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [engineering, setEngineering] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [typeJob, setTypeJob] = useState("trainee");
    const [linkJob, setLinkJob] = useState("");

    // carregando dados para as listbox
    const engenharias = useEngenharias();
    const estados = useEstados();
    const cidades = useCidades(state);

    const { loading, error, handleRegister } = useRegisterOpportunity();


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleRegister({
            title,
            description,
            typeEngineering: engineering,
            typeJob,
            jobLocation: city + " - " + state,
            requirements:"",
            benefits:"",
            responsabilities:"",
            link: linkJob
        });

    };

    return (
        <div className="divulgacao-container">

            <HeaderPage />

            <form onSubmit={handleSubmit} className="divulgacao-form">
                {error && <div className="alert alert-danger">{error}</div>}
                <h2>Divulgar Oportunidade</h2>
                <Input
                    label="Título"
                    type="text"
                    placeholder="Titulo da oportunidade"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                <TextViewCustom
                    editable={true}
                    label="Descrição"
                    className="textview-container"
                    height={100}
                    text={""}
                    onChange={(textoDigitado) => setDescription(textoDigitado)}

                />

                <ListBoxCustom
                    dados={engenharias}
                    renderItem={(item) => <span>{item.name}</span>}
                    label="Campo da Engenharia"
                    onChange={(item) => setEngineering(item.name)}

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
                    value={linkJob}
                    onChange={e => setLinkJob(e.target.value)}
                />


                <Button type="submit" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar Oportunidade'}
                </Button>

            </form>


        </div>


    );


}