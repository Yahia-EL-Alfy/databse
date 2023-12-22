# Stage 1: Build the Angular application
FROM node:18.18.0-alpine3.18 AS build

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Angular application
RUN npm run build

# Stage 2: Use an official Nginx image for serving the application
FROM nginx:1.21.1-alpine

# Copy the built Angular application to the Nginx document root
COPY --from=build /app/dist/tools-project /usr/share/nginx/html

# Copy Nginx configuration
COPY docker/nginx/default.conf.template /etc/nginx/templates/default.conf.template

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
