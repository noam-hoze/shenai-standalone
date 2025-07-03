# Use official Node.js 22 base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all source files
COPY . .

# Build development version
RUN npm run build:development

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "start:development"]