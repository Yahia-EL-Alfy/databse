# Use an official Node.js Alpine image as the build environment
FROM node:18.18.0-alpine3.18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ["package.json", "package-lock.json", "./"]


# Set the npm registry if needed (uncomment and modify as necessary)
RUN ["npm", "config", "set", "registry", "https://registry.npmjs.org/"]

# Run npm install in a way that handles network issues
RUN ["npm", "ci"]

# Copy the rest of the application code to the working directory
COPY . .

# Build the Angular application
RUN ["npx", "ng", "build"]

# Use an official Nginx image for serving the application
FROM nginxinc/nginx-unprivileged:alpine3.18-perl

# Copy the Nginx configuration template
COPY --chown=nginx:nginx docker/nginx/default.conf.template /etc/nginx/templates/default.conf.template

# Copy the built Angular application to the Nginx document root
COPY --chown=nginx:nginx --from=build /app/dist/tools-project /var/www/html/
