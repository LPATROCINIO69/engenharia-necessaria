FROM node:20-alpine

WORKDIR /usr/src/app

# 1️⃣ Copiar APENAS os arquivos necessários para instalação
COPY package*.json ./

# 2️⃣ Instalar dependências de PRODUÇÃO (não devDependencies)
RUN npm ci --only=production

# 3️⃣ ✅ COPIA ESPECÍFICA da pasta dist/ (seu build)
COPY dist/ ./dist/

# Verificar se o server.js existe
RUN test -f ./dist/server.js || (echo "❌ server.js não encontrado" && exit 1)

# 4️⃣ Copiar outros arquivos necessários (se houver)
COPY public/ ./public/
COPY config/ ./config/
 
# 5️⃣ Expor a porta que o GCP espera
EXPOSE 8080

# 6️⃣ Variáveis de ambiente
ENV NODE_ENV=production

# 9️⃣ Verificação opcional: listar arquivos dentro de dist
RUN ls -l ./dist

# 7️⃣ ✅ Comando que usa os arquivos da pasta dist
CMD ["node", "dist/server.js"]