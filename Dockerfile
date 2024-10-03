# Usa una imagen base de Node.js
FROM node:16-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código de la aplicación
COPY . .

# Compila la aplicación
RUN npm run build

# Expone el puerto
EXPOSE 3000

# Comando para correr la aplicación
CMD ["npm", "run", "start:prod"]