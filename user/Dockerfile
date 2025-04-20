# Use Node.js Alpine base image for a small footprint
FROM node:16-alpine

# Set working directory inside the container
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application files
COPY . .

# Expose the service port
EXPOSE 3001

# Start the service
CMD ["node", "server.js"]
