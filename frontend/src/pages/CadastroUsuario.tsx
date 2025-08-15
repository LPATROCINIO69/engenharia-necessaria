import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { HeaderPage } from "../components/HeaderPage";
import { useAuth } from "../hooks/useAuth.ts";


import '../styles/CadastroUsuario.css';
import { useState } from "react";



export function CadastroUsuario(){
    const [name, setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {loading, error, handleRegister} = useAuth();



    const handleSubmit = (e:React.FormEvent) =>{
        e.preventDefault();        
        handleRegister({ name, email, password });
    };

    
    return(
        <div className="usuario-container">
            <HeaderPage />

            <form onSubmit={handleSubmit} className="usuario-form">
                {error && <div className="alert alert-danger">{error}</div>}

                <h2>Cadastrar Usuário</h2>
                <Input 
                    label="Nome"
                    type="text"
                    value={name}
                    onChange={e =>setName(e.target.value)}
                    placeholder="nome do usuário"
                />
                <Input 
                    label="E-mail"
                    type ="email"
                    value={email}
                    onChange={e =>setEmail(e.target.value)}
                    placeholder="nome_usuario@endereco.com"
                    required
                />

                <Input 
                    label="Senha"
                    value={password}
                    type="password"
                    onChange={e =>setPassword(e.target.value)}
                    minLength={6}
                    placeholder="***********"
                />
                
                <Button type ="submit" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </Button>
                

            </form>
            

        </div>


    );


}