# 📢Sistema Engenharia-Necessaria

## Apresentação
Trabalho de Conclusão de Curso de Pós-Graduação em Desenvolvimento de Sistemas Full-Stack pela PUC-RS. Este trabalho tem por objetivo criar um sistema que gerencia e disponibiliza vagas de emprego e estágio para engenheiros.

## Composição do sistema
 O sistema está logicamente divido em duas partes:
- **Backend**: estabelecido no servidor (server) para processar os dados e composto por:
    - API que gerencia as requisições e repostas html;
    - _Web Scraper_ para retorno de dados a partir de sites de vagas de estágio/emprego.
    
      
- **Frontend**: estabelecido para servir de interface com usuário na forma de PWA. Encontra-se estruturada em 5 telas que utilizam requisições HTTP para obter serviços da API presente no backend. As telas que orientam a execução de atividades do usuário são as seguintes:
  - Login: é a tela inicial responsável por permitir o acesso ao sistema e suas outras funcionalidades. Possui um link para a próxima tela de "cadastro de usuário", caso o usuário esteja acessando o sistema pela primeira vez. Caso já esteja cadastrado, após inserir o LOGIN/SENHA, será encaminhado para a tela de "Oportunidades".
  - Cadastro de usuário: faz parte de um fluxo alternativo que é acessado somente quando o usuário ainda não possui cadastro no sistema. Ele entrará com nome, login e senha (ilegível na tela enquanto digita) e clicará no botão "cadastrar". Caso seja bem sucedido, será reencaminhado para a tela de LOGIN para efetuar o acesso.
  - Oportunidades: Tela que permite a visualização de uma lista resumida de vagas de emprego/estágio, exigindo antes que o usuário insira: Tipo de engenharia, Estado/cidade, tipo de trabalho (estágio ou emprego). Um clique duplo sobre uma das vagas de engenharia irá encaminhá-lo para a tela de "descrição detalhada" da vaga. O usuário também pode clicar em um botão "divulgar" para cadastrar no banco de dados sua oferta de vaga de emprego/estágio.
  - Descrição detalhada: permite ao usuário ver uma descrição completa da vaga de emprego contendo outras informações, tais como: benefícios, requisitos, responsabilidade e hiperlink de acesso a a vaga no site de origem. Também possui um botão para direcionar para a tela de "divulgação de vagas".
  - Divulgar vaga: permite que o usuário cadastre uma nova vaga no banco de dados para ser acessada por outros usuários que queiram tomar conhecimento a respeito.

## LINKS para Documentação
- [Documentação do BACKEND]()
- [Documentação do FRONTEND]()




