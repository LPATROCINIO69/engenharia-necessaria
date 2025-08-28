# 📢Sistema Engenharia-Necessaria - FRONTEND

## Apresentação 
Trabalho de Conclusão de Curso de Pós-Graduação em Desenvolvimento de Sistemas Full-Stack pela PUC-RS. Este trabalho tem por objetivo criar um sistema que gerencia e disponibiliza vagas de emprego e estágio para engenheiros.

## 🎶 Frontend
O sistema frontend consiste em uma aplicação do tipo PWA, e portanto, pode ser baixada no celular ou computador do usuário e consome os serviços da API no Backend. No momento, as interfaces foram criadas e configuradas para operar em um celular. Encontra-se estruturada em 5 telas que utilizam requisições HTTP para obter serviços da API presente no backend. As telas que orientam a execução de atividades do usuário são as seguintes:
  - **Login**: é a tela inicial responsável por permitir o acesso ao sistema e suas outras funcionalidades. Possui um link para a próxima tela de "cadastro de usuário", caso o usuário esteja acessando o sistema pela primeira vez. Caso já esteja cadastrado, após inserir o LOGIN/SENHA, será encaminhado para a tela de "Oportunidades".
  - **Cadastro de usuário**: faz parte de um fluxo alternativo que é acessado somente quando o usuário ainda não possui cadastro no sistema. Ele entrará com nome, login e senha (ilegível na tela enquanto digita) e clicará no botão "cadastrar". Caso seja bem sucedido, será reencaminhado para a tela de LOGIN para efetuar o acesso.
  - **Oportunidades**: Tela que permite a visualização de uma lista resumida de vagas de emprego/estágio, exigindo antes que o usuário insira: Tipo de engenharia, Estado/cidade, tipo de trabalho (estágio ou emprego). Um clique duplo sobre uma das vagas de engenharia irá encaminhá-lo para a tela de "descrição detalhada" da vaga. O usuário também pode clicar em um botão "divulgar" para cadastrar no banco de dados sua oferta de vaga de emprego/estágio.
  - **Descrição detalhada**: permite ao usuário ver uma descrição completa da vaga de emprego contendo outras informações, tais como: benefícios, requisitos, responsabilidade e hiperlink de acesso a a vaga no site de origem. Também possui um botão para direcionar para a tela de "divulgação de vagas".
  - **Divulgar vaga**: permite que o usuário cadastre uma nova vaga no banco de dados para ser acessada por outros usuários que queiram tomar conhecimento a respeito.

## Estrutura de pastas
```
frontend/
 ├── public/              # Ícones e manifest.json
 ├── dist/                # Ícones e manifest.json
 ├── src/
 │    ├── components/     # estrutura os pacotes de componentes que serão utilizados na interface gráfica com o usuário (botões, caixas de texto, etc.)
 │    ├── config/         # Armazena configurações que são utilizadas pelo frontend tais como as urls com os endpoints para a API
 │    ├── hooks/          # Organiza funções do React que permitem usar estados, ciclos de vida e outros recursos sem escrever classes e encapsulam lógicas reutilizáveis.
 │    ├── models/         # Tipagens e interfaces (Opportunity, etc.)
 │    ├── services/       # Acesso à API (api.ts, opportunities.ts, etc.)
 │    ├── pages/          # armazena as páginas que formam as telas com as quais o usuário interage
 │    ├── styles/         # contém os arquivos de estilo .CSS, utilizados nas paginas e componentes gráficos
 │    ├── util/           # Armazena pacotes que não fazem parte da função principal do sistema, mas ajudam em atividades auxiliares.
 │    ├── App.tsx         # Estrutura principal  
 │    └── main.tsx        # Ponto de entrada
 │    └── vite-env.d.ts   # declara tipos globais que o vite precisa para funcionar adequadamente no ambiente Typescript
 ├── tests/               # Testes unitários e integração
 ├── package.json
 ├── vite.config.ts
 └── README.md
```


## Tecnologias Utilizadas
Nesta listagem, constam as tecnologias que precisam ser instaladas para que o frontend opere adequadamente. Há outras tecnologias que são utilizadas apenas para desenvolvimento do sistema e não serão apresentadas nesta documentação.
- React + vite
- Typescript
- React Router
- React DOM
- Vite PWA plugin
- dompurify

## Dependências do Frontend
As dependências do frontend podem ser instaladas por meio da seguinte instrução:  

`npm install <nome-da-dependência>`  

ou para dependências acessadas globalmente  

`npm install -g <nome-da-dependência>`  

Para o Frontend do sistema **"Engenharia Necessária"** foram instalados os seguintes pacotes (conforme listagem descritiva na seção _dependencies_ do arquivo `package.json`):  

| Dependência          | Versão   | Finalidade                                                                 |
| -------------------- | -------- | -------------------------------------------------------------------------- |
| **dompurify**        | ^3.2.6   | Biblioteca para sanitização de HTML, prevenindo vulnerabilidades XSS.       |
| **react**            | ^19.1.0  | Biblioteca principal para construção da interface do usuário (UI).          |
| **react-dom**        | ^19.1.0  | Biblioteca que conecta o React ao DOM, permitindo renderização dos elementos. |
| **react-router-dom** | ^7.8.0   | Gerenciamento de rotas e navegação no frontend da aplicação.                |

## Variáveis de ambiente
As variáveis de ambiente foram configuradas no arquivo '.env'. Devido a sua natureza sigilosa, ele não consta no repositório, mas deve ser instalado no diretório raiz do backend para que o sistema possa operar e suas variáveis devem ser devidamente configuradas. Abaixo encontra-se uma tabela contendo as variáveis de ambiente presentes no '.env' e suas respectivas funções:
| Variável                 | Para que serve                                                        |
| ------------------------ | --------------------------------------------------------------------- |
| VITE_API_URL             | contém a url raiz para acesso a api      (ex.: http://localhost:3000) |


## Como Executar o frontend
O sistema **Frontend** do projeto *Engenharia Necessária* utiliza o **Vite** como servidor de desenvolvimento e ferramenta de build.  
As instruções de execução podem ser feitas por meio dos seguintes comandos npm:

| Comando                  | Descrição                                                                 |
| ------------------------- | ------------------------------------------------------------------------- |
| `npm run dev`             | Inicia o servidor de desenvolvimento com hot-reload para testes locais.  |
| `npm run build`           | Gera a versão otimizada do projeto para produção.                        |
| `npm run preview`         | Executa a versão de produção gerada pelo `build` em um servidor local.   |
| `npm run lint`            | Executa o ESLint para analisar e validar o código conforme as regras definidas. |


## Acesso ao aplicativo frontend do ENGENHARIA NECESSARIA armazenado no GPC-FIREBASE
O acesso ao frontend é feito pelo hyperlink: https://reference-yen-415813.web.app/
