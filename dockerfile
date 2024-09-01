# Use uma imagem base que tenha o Node.js instalado
FROM node:18

# Defina o diretório de trabalho no contêiner
WORKDIR /web

# Instale pnpm globalmente
RUN npm install -g pnpm

# Copie o package.json e o pnpm-lock.yaml para o contêiner
COPY package.json pnpm-lock.yaml ./

# Instale as dependências
RUN pnpm install

# Copie o restante do código-fonte para o contêiner
COPY . .

# Garanta que a permissão está correta
RUN chmod -R 777 /web

# Exponha a porta em que a aplicação Vite será executada
EXPOSE 8080

# Comando para iniciar a aplicação Vite
CMD ["pnpm", "run", "dev"]
