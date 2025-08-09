import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { HeaderPage } from "../components/HeaderPage";

import '../styles/CadastroUsuario.css';



export function CadastroUsuario(){
   
    
    return(
        <div className="usuario-container">
            <HeaderPage />

            <form className="usuario-form">
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