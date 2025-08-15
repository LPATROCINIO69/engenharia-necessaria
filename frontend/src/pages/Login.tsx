import React,{useState} from "react";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { HeaderPage } from "../components/HeaderPage";

import '../styles/Login.css';
import { Link} from "react-router-dom";
import { useLogin } from "../hooks/useLogin";



export function Login(){
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const {loading, error, handleRegister} = useLogin();
    

    const handleSubmit = (e:React.FormEvent) =>{
        e.preventDefault();        
         handleRegister({  email, password });      

    };

    return(
        <div className="login-container">
            
            <HeaderPage />

            <form onSubmit={handleSubmit} className="login-form">
                {error && <div className="alert alert-danger">{error}</div>}
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
                     minLength={6}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                
                <Button type ="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</Button>
                <a href ="#" className="login-forgot">Esqueceu sua senha?</a>

            </form>
            <footer className="login-footer">
                Não tem uma conta? <Link to="/cadastrousuario">Cadastre-se</Link>
            </footer>

        </div>


    );


}


