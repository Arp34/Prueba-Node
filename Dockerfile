# Etapa 1: Construcción (Build)
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Compilar TypeScript a JavaScript (dist/)
RUN npm run build

# Etapa 2: Producción
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copiar package.json e instalar solo dependencias de producción
COPY package*.json ./
RUN npm ci --only=production

# Copiar el código compilado desde la etapa de construcción
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/uploads ./uploads

EXPOSE 3000

CMD ["node", "dist/index.js"]