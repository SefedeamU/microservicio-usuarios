# Use a Node.js base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install @nestjs/cli as a development dependency
RUN npm install --save-dev @nestjs/cli

# Copy the rest of the application files
COPY . .

# Set the PATH to include node_modules/.bin
ENV PATH="./node_modules/.bin:$PATH"

# Ensure the nest binary has execute permissions
RUN chmod +x ./node_modules/.bin/nest

# Compile the application
RUN npx nest build

# Expose the port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]