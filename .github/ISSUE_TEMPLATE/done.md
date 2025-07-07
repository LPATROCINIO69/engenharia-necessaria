---
name: Tarefa concluída
about: Modelo para registrar tarefas já finalizadas
title: "[DONE]"
labels: ["done"]
assignees: []
---

### ✅ Tarefa concluída

**Título:** Criar conexão com MongoDB Atlas

**Data de conclusão:** 07/07/2025

---

### ✔️ Descrição

Conectado o backend Node.js/Express com o banco de dados MongoDB hospedado no Atlas. A URI foi armazenada em arquivo `.env` e a função `connectDatabase()` foi criada no arquivo `config/database.ts`.

---

### 🛠️ Tecnologias/recursos utilizados

- Mongoose
- dotenv
- MongoDB Atlas

---

### 📄 Evidência/resultado

- Mensagem “MongoDB conectado com sucesso.” exibida no terminal.
- Teste de inserção realizado com sucesso na coleção `test`.

---

### 🔗 Referência no código
- `/backend/src/config/database.ts`
- `.env.example` com chave `MONGO_URI`

