import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { HeaderPage } from "../components/HeaderPage";
import { useNavigate } from "react-router-dom";

import '../styles/CadastroUsuario.css';



export function CadastroUsuario(){
    const navigate = useNavigate();

    const handleSubmit = (e:React.FormEvent) =>{
        e.preventDefault();        
        navigate('/');

        // TO DO: chamar o serviço de autenticação para continuar a abertura do sistema
//      console.log("Login com:  ", email, senha);
    };

    
    return(
        <div className="usuario-container">
            <HeaderPage />

            <form onSubmit={handleSubmit} className="usuario-form">
                <h2>Cadastrar Usuário</h2>
                <Input 
                    label="Nome"
                    type="text"
                    placeholder="nome do usuário"
                />
                <Input 
                    label="E-mail"
                    type ="email"
                    placeholder="nome_usuario@endereco.com"
                    required
                />

                <Input 
                    label="Senha"
                    type="password"
                    placeholder="***********"
                />
                
                <Button type ="submit">Cadastrar</Button>
                

            </form>
            

        </div>


    );


}