# 📢Sistema Engenharia-Necessaria - BACKEND

## Apresentação
Trabalho de Conclusão de Curso de Pós-Graduação em Desenvolvimento de Sistemas Full-Stack pela PUC-RS. Este trabalho tem por objetivo criar um sistema que gerencia e disponibiliza vagas de emprego e estágio para engenheiros.

## Backend
Estabelecido no servidor (server) para processar os dados e composto por:
 - API que gerencia as requisições e repostas html;
 - _Web Scraper_ para retorno de dados a partir de sites de vagas de estágio/emprego.

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
  
