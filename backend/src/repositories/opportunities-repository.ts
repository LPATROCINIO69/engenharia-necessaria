import { Opportunity } from "../models/opportunity-model";
import { FieldEngineering as Engenharia} from "../domain/enums/fieldEngineering";
import { TypeJob as TipoVaga } from "../domain/enums/typeJob";



// TO DO: base de dados para teste. Substituir por base de dados em MongoDB.
const database:Opportunity[] = [
    {id:1, 
     title:"Estágio em Engenharia – Sede", 
     description:"A empresa SESI/SENAI está com nova vaga em aberto na cidade de Vitória para o cargo de Estágio em Engenharia – Sede",
     typeEngineering: Engenharia.Mecanica ,
     typeJob: TipoVaga.TRAINEE,
     jobLocation:"Vitória-ES",
     requirements:"",
     benefits:"",
     responsabilities:"",
     data:"14/07/2025",
     link:"https://maisvagases.com.br/vaga/estagio-em-engenharia-sede/"
    },
    {id:2, 
     title:"Líder de Engenharia – Obras", 
     description:"A empresa Grupo Autoglass está com nova vaga em aberto na cidade de Grande Vitória para o cargo de Líder de Engenharia – Obras",
     typeEngineering: Engenharia.Civil ,
     typeJob: TipoVaga.JOB,
     jobLocation:"Grande Vitória-ES",
     requirements:"",
     benefits:"",
     responsabilities:"",
     data:"14/07/2025",
     link:"https://maisvagases.com.br/vaga/lider-de-engenharia-obras/"
    },
    {id:3, 
     title:"Analista de Produção", 
     description:"A empresa Corps Siderurgia está com nova vaga em aberto na cidade de Serra para o cargo de Analista de Produção",
     typeEngineering: Engenharia.Eletrica ,
     typeJob: TipoVaga.JOB,
     jobLocation:"Serra-ES",
     requirements:"",
     benefits:"",
     responsabilities:"",
     data:"14/07/2025",
     link:"https://maisvagases.com.br/vaga/analista-de-producao-3/"
    },
    {id:4, 
     title:"Estágio em Orçamento", 
     description:"A empresa RP Talentos está com nova vaga em aberto na cidade de Vila Velha para o cargo de Estágio em Orçamento",
     typeEngineering: Engenharia.Producao ,
     typeJob: TipoVaga.TRAINEE,
     jobLocation:"Serra-ES",
     requirements:"",
     benefits:"",
     responsabilities:"",
     data:"14/07/2025",
     link:"https://maisvagases.com.br/vaga/estagio-em-orcamento/"
    }
    ];


export const findAllOpportunities= async (typeJob:string,typeEngineering:string,jobLocation:string):Promise<Opportunity[]>=>{
    return database;
}
