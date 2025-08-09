import React,{useState} from "react";
import { Logo } from "../components/Logo";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

import '../styles/Login.css';


export function Login(){
    const [email, setEmail]= useState('');
    const [senha, setSenha]= useState('');

    const handleSubmit = (e:React.FormEvent) =>{
        e.preventDefault();
        // TO DO: chamar o serviço de autenticação para continuar a abertura do sistema
        console.log("Login com:  ", email, senha);
    };

    return(
        <div className="login-container">
            <header className="login-header">
                <Logo />
                <h1>Engenharia Necessária</h1>
            </header>

            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <Input 
                    label="E-mail"
                    type ="email"
                    placeholder="nome_usuario@endereco.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <Input 
                    label="Senha"
                    type="password"
                    placeholder="***********"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />
                
                <Button type ="submit">Entrar</Button>
                <a href ="#" className="login-forgot">Esqueceu sua senha?</a>

            </form>
            <footer className="login-footer">
                Não tem uma conta? <a href="#">Cadastre-se</a>
            </footer>

        </div>


    );


}