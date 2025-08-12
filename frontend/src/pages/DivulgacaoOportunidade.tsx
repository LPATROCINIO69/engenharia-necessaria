import React from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { TextViewCustom } from "../components/TextViewCustom";
import { HeaderPage } from "../components/HeaderPage";

import '../styles/DivulgacaoOportunidade.css';
import { useNavigate } from "react-router-dom";
import { ListBoxCustom } from "../components/ListBoxCustom";
import { TipoTrabalhoSelector } from "../components/TipoTrabalhoSeletor";

// TO DO: Resgatar conteúdos para as LISTBOX
const cidades = ["São Paulo - SP", "Rio de Janeiro - RJ", "Curitiba - PR"];
const engenharias = ["Engenharia Mecânica", "Engenharia Civil", "Engenharia Elétrica"];


export function DivulgacaoOportunidade() {
    const navigate = useNavigate();

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
                />

                <TextViewCustom
                    editable={true}
                    label="Descrição"
                    className="textview-container"
                    height={100}
                    text={""}
                    
                />

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

                 <Input
                    label="Link para vaga"
                    type="url"
                    placeholder="http://www.google.com.br"
                />

                <Button type="submit">Cadastrar Oportunidade</Button>


            </form>


        </div>


    );


}