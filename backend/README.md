# 📢Sistema Engenharia-Necessaria - BACKEND

## Sumário
- [Apresentação](#apresentacao)
- [Backend](#backend)
- [Estrutura de Arquivo](#estrutura-de-arquivo)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Dependências do Backend](#dependencias-do-backend)
- [Variáveis de ambiente](#variaveis-de-ambiente)
- [API - Endpoints Principais](#api---endpoints-principais)
- [Como Executar a API](#como-executar-a-api)
- [Dicionário de Dados - Banco engenhariaopportunity](#dicionario-de-dados---banco-engenhariaopportunity)
  - [Coleção: users](#colecao-users)
  - [Coleção: opportunities](#colecao-opportunities)
  - [Coleção: engineerings](#colecao-engineerings)
  - [Coleção: joblocation](#colecao-joblocation)

## Apresentação 
Trabalho de Conclusão de Curso de Pós-Graduação em Desenvolvimento de Sistemas Full-Stack pela PUC-RS. Este trabalho tem por objetivo criar um sistema que gerencia e disponibiliza vagas de emprego e estágio para engenheiros.

## Backend
Estabelecido no servidor (server) para processar os dados e composto por:
 - API que gerencia as requisições e repostas html;
 - _Web Scraper_ para retorno de dados a partir de sites de vagas de estágio/emprego.

## Estrutura de Arquivo
```
backend/
 ├── doc/                          # documentos auxiliares do sistema
 ├── src/
 │    ├── adapters/                # utilizado para interpretar a leitura de páginas pelo webscraper
 │    ├── config/                  # guarda configurações utilizadas pelo sistema (p.e.: conexão a bancos de dados)
 │    ├── controllers/             # Centraliza a Lógica que lida com as requisições dos usuários e decide o que será feito
 │    ├── domain/                  # representa conceitos utilizados no domínio de negócio
 │    ├── mappers/                 # efetua a tradução de diferentes representações de dados
 │    ├── models/                  # Tipagens e interfaces (Opportunity, etc.)
 │    ├── repositories/            # Faz as operações associadas ao bancos de dados: inserção, deleção e pesquisa de registros
 │    ├── routes/                  # Mapeia os caminhos (endpoints) que serão seguidos pelos métodos HTTP
 │    ├── scripts/                 # Define um conjunto de scripts auxiliares para realizar o preenchimento do banco de dados para testes ou com dados auxiliares
 │    ├── services/                # Concentra a lógica de negócio da aplicação, implementando as regras de negócio mais complexas.
 │    ├── utils/                   # Armazena pacotes que não fazem parte da função principal do sistema, mas ajudam em atividades auxiliares.
 │    ├── App.tsx                  # Estrutura principal
 │    └── server.ts                # Ponto de entrada
 │    └── scraper-server.ts        # Ponto de entrada
 ├── tests/                        # Testes unitários e integração
 ├── package.json
 ├── vite.config.ts
 └── README.md

```

## Tecnologias utilizadas
O Backend (API+WEB SCRAPER) utilizou as seguintes tecnologias em seu desenvolvimento:
- Node.js
- Express
- Typescript
- MongoDB Atlas
- Puppeteer
- JWT

## Dependências do Backend
As dependências do backend podem ser instaladas por meio da seguinte instrução:

`npm install <nome-da-dependência>` 

ou para dependências acessadas globalmente  

`npm install -g <nome-da-dependência>`

Para o Backend do sistema "Engenharia Necessária" foram instalados os seguintes pacotes (conforme listagem descritiva na seção _dependencies_ do arquivo 'package.json'):
| Dependência      | Versão   | Finalidade                                                                     |
| ---------------- | -------- | ------------------------------------------------------------------------------ |
| **axios**        | ^1.11.0  | Cliente HTTP para fazer requisições a APIs externas e ao backend.              |
| **bcryptjs**     | ^3.0.2   | Biblioteca para criptografia e comparação de senhas de usuários.               |
| **cors**         | ^2.8.5   | Middleware para habilitar o compartilhamento de recursos entre origens (CORS). |
| **dotenv**       | ^17.2.0  | Carregamento de variáveis de ambiente a partir de arquivos `.env`.             |
| **express**      | ^5.1.0   | Framework web para Node.js usado na construção da API RESTful.                 |
| **jsonwebtoken** | ^9.0.2   | Implementação de autenticação baseada em tokens JWT (JSON Web Token).          |
| **mongoose**     | ^8.16.4  | ODM (Object Data Modeling) para interação com o banco de dados MongoDB.        |
| **puppeteer**    | ^24.16.2 | Biblioteca para automação de navegação em páginas web e web scraping.          |

## Variáveis de ambiente
As variáveis de ambiente foram configuradas no arquivo '.env'. Devido a sua natureza sigilosa, ele não consta no repositório, mas deve ser instalado no diretório raiz do backend para que o sistema possa operar e suas variáveis devem ser devidamente configuradas. Abaixo encontra-se uma tabela contendo as variáveis de ambiente presentes no '.env' e suas respectivas funções:
| Variável                 | Para que serve                                                        |
| ------------------------ | --------------------------------------------------------------------- |
| `PORT`                   | Porta em que a API backend vai rodar localmente (ex.: 8080, 9090).    |
| `MONGO_URI`              | URL de conexão com o banco MongoDB Atlas.                             |
| `JWT_SECRET`             | Chave secreta usada para assinar e validar tokens JWT.                |

Um exemplo de preenchimento destas variáveis com valores fictícios encontra-se ilustrado abaixo.
```
PORT=8080
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/engenharia
JWT_SECRET=sua_chave_secreta
```
## API - Endpoints Principais 
Os endpoints utilizados para acessar as funcionalidades da API podem ser visualizados na tabela abaixo.
| Método     | Endpoint                 | Parâmetros / Corpo                                           | Tipo     | Descrição                                                         |
| ---------- | ------------------------ | ------------------------------------------------------------ | -------- | ----------------------------------------------------------------- |
| **POST**   | `/api/users/register`    | `{ name, email, password }`                                  | `body`   | Cadastra um novo usuário.                                         |
| **POST**   | `/api/users/login`       | `{ email, password }`                                        | `body`   | Autentica o usuário e retorna um token JWT.                       |
| **GET**    | `/api/opportunities`     | `?tipoEngenharia=...&tipoTrabalho=...&estado=...&cidade=...` | `query`  | Lista oportunidades, com filtros opcionais.                       |
| **GET**    | `/api/opportunities/:id` | `id` (identificador da vaga)                                 | `params` | Retorna detalhes de uma oportunidade específica.                  |
| **POST**   | `/api/opportunities`     | `{ titulo, empresa, local, requisitos, beneficios, fonte }`  | `body`   | Cadastra manualmente uma nova oportunidade (usuário autenticado). |
| **DELETE** | `/api/opportunities/:id` | `id` (identificador da vaga)                                 | `params` | Remove oportunidade cadastrada pelo usuário (quando autorizado).  |

## Como Executar a API ...
A API pode ser executada utilizando os seguintes scripts (conforme descrito no package.json):
-   _utilizar_ `npm run start:dev` _para executar a API no ambiente de desenvolvimento_.
-   _utilizar_ `npm run start:watch` _para executar a API no ambiente de desenvolvimento em modo "watch"_ 
-   _utilizar_ `npm run dist` _para realizar a compilação do código typescript para javascript e armazenar na pasta 'dist'.
-   _utilizar_ `npm run start:dist` _para realizar a compilação do código typescript em javascript e executar o arquivo index.js ativando a API no ambiente de produção_.

## Dicionário de Dados - Banco engenhariaopportunity
O banco de dados criado no MongoDB para guardar as informações utilizadas pelo Sistema "Engenharia Necessária" recebeu o nome de 'engenhariaopportunity' e até o momento é formado por 4 collections.

### Coleção: users
Responsável por armazenar os dados (nome, login, senha) do usuário do sistema.

| Campo | Tipos | Obrigatório | Exemplo |
|-------|-------|------------|--------|
| _id | object | Sim | "689f5c8538164460d586eae5" |
| name | string | Sim | "Lucio Passos Patrocinio" |
| email | string | Sim | "luciopp@gmail.com" |
| password | string | Sim | "$2b$10$9fUkL09OY8tV6a3QIyoaTu4S8LY0wDaqP6XZssp8Tds12eyxWl4Ii" |
| createdAt | object | Sim | "2025-08-15T16:12:53.459Z" |
| __v | number | Sim | 0 |

### Coleção: opportunities
Armazena os registros de vagas para trabalho e estágio nas diversas áreas de engenharia.

| Campo | Tipos | Obrigatório | Exemplo |
|-------|-------|------------|--------|
| _id | object | Sim | "689f7928b2d3b6ffff1d115a" |
| title | string | Sim | "Estagiário De Engenharia Civil" |
| description | string | Sim | "Estágio em Engenharia Civil - São Paulo/SP\nData de Início: Imediata | Tipo de contrato: Estágio | Local da Vaga: São Paulo - SP\nBolsa-Auxílio: R$ 2.500,00 + R$ 400,00 de auxílio transporte\nHorário de Expediente: Conforme acordo de estágio, em horário comercial\n\nSobre a Empresa\nEmpresa de engenharia com sólida experiência na elaboração de laudos técnicos e avaliações, reconhecida pela qualidade e precisão de seus serviços. Mantém um ambiente de trabalho colaborativo, com foco no desenvolvimento de seus profissionais e na aplicação prática do conhecimento acadêmico. O estagiário terá contato direto com rotinas técnicas e aprenderá com profissionais experientes do setor.\n\nBenefícios\nBolsa-auxílio compatível com o mercado\n\nVale-transporte\n\nAmbiente de trabalho colaborativo\n\nAcompanhamento técnico por engenheiros experientes\n\nOportunidade de aprendizado prático e desenvolvimento profissional\n\nAtividades da Função\nO estagiário de engenharia civil apoiará a equipe na elaboração de laudos técnicos e avaliações, auxiliando na coleta de dados, organização de informações e formatação de documentos. Também poderá participar de visitas técnicas, apoiar medições e acompanhar processos de análise, sempre sob supervisão. Essa função oferece a oportunidade de aplicar conhecimentos teóricos adquiridos na graduação em situações reais de trabalho.\n\nRequisitos Obrigatórios\nEstar cursando Engenharia Civil\n\nBoa redação técnica e atenção aos detalhes\n\nConhecimento básico em informática e pacote Office\n\nOrganização e comprometimento com prazos\n\nDisponibilidade para atuar em São Paulo/SP" |
| typeEngineering | string | Sim | "Engenharia Civil" |
| typeJob | string | Sim | "trainee" |
| jobLocation | string | Sim | "São Paulo - SP" |
| requirements | string | Sim | "Escolaridade Mínima:  Ensino Superior" |
| benefits | string | Sim | "A verificar" |
| responsabilities | string | Sim | "Estágio em Engenharia Civil - São Paulo/SP\nData de Início: Imediata | Tipo de contrato: Estágio | Local da Vaga: São Paulo - SP\nBolsa-Auxílio: R$ 2.500,00 + R$ 400,00 de auxílio transporte\nHorário de Expediente: Conforme acordo de estágio, em horário comercial\n\nSobre a Empresa\nEmpresa de engenharia com sólida experiência na elaboração de laudos técnicos e avaliações, reconhecida pela qualidade e precisão de seus serviços. Mantém um ambiente de trabalho colaborativo, com foco no desenvolvimento de seus profissionais e na aplicação prática do conhecimento acadêmico. O estagiário terá contato direto com rotinas técnicas e aprenderá com profissionais experientes do setor.\n\nBenefícios\nBolsa-auxílio compatível com o mercado\n\nVale-transporte\n\nAmbiente de trabalho colaborativo\n\nAcompanhamento técnico por engenheiros experientes\n\nOportunidade de aprendizado prático e desenvolvimento profissional\n\nAtividades da Função\nO estagiário de engenharia civil apoiará a equipe na elaboração de laudos técnicos e avaliações, auxiliando na coleta de dados, organização de informações e formatação de documentos. Também poderá participar de visitas técnicas, apoiar medições e acompanhar processos de análise, sempre sob supervisão. Essa função oferece a oportunidade de aplicar conhecimentos teóricos adquiridos na graduação em situações reais de trabalho.\n\nRequisitos Obrigatórios\nEstar cursando Engenharia Civil\n\nBoa redação técnica e atenção aos detalhes\n\nConhecimento básico em informática e pacote Office\n\nOrganização e comprometimento com prazos\n\nDisponibilidade para atuar em São Paulo/SP" |
| data | object | Sim | "2025-08-15T17:56:07.443Z" |
| link | string | Sim | "https://www.infojobs.com.br/vaga-de-estagiario-engenharia-civil-em-sao-paulo__10842153.aspx" |
| __v | number | Sim | 0 |

### Coleção: engineerings
Armazena a listagem de tipos de engenharia (Engenharia Civil, Elétrica, mecânica, etc.) que são disponibilizados neste sistema.

| Campo | Tipos | Obrigatório | Exemplo |
|-------|-------|------------|--------|
| _id | object | Sim | "689fccba4ce61eebca7f030a" |
| key | string | Sim | "Civil" |
| name | string | Sim | "Engenharia Civil" |
| __v | number | Sim | 0 |

### Coleção: joblocation
Guarda a listagem de mais de 5000 cidades integrantes do Brasil. Contém além do nome da cidade, a sigla do estado da federação e o código do IBGE.

| Campo | Tipos | Obrigatório | Exemplo |
|-------|-------|------------|--------|
| _id | object | Sim | "689fc5280d5a49ad24141521" |
| cidade | string | Sim | "Alta Floresta D'Oeste" |
| estado | string | Sim | "RO" |
| codigoIbge | number | Sim | 1100015 |
| __v | number | Sim | 0 |


  
