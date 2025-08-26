FROM node:20-alpine

WORKDIR /usr/src/app

# 1️⃣ Copiar APENAS os arquivos necessários para instalação
COPY package*.json ./

# 2️⃣ Instalar dependências de PRODUÇÃO (não devDependencies)
RUN npm ci --only=production

# 3️⃣ ✅ COPIA ESPECÍFICA da pasta dist/ (seu build)
COPY dist/ ./dist/

# 4️⃣ Copiar outros arquivos necessários (se houver)
# COPY public/ ./public/
# COPY config/ ./config/
 
# 5️⃣ Expor a porta que o GCP espera
EXPOSE 8080

# 6️⃣ Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=8080

# 7️⃣ ✅ Comando que usa os arquivos da pasta dist
CMD ["node", "dist/index.js"]  # Ajuste para seu entrypoint