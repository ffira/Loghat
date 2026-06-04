# Use the official Node.js 20 Alpine image for a lightweight runtime environment
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy dependency definition files
COPY package*.json ./

# Install all dependencies (including devDependencies needed for compiling the frontend and executing tsx)
RUN npm ci

# Copy the entire workspace into the container
COPY . .

# Compile the Vite static frontend bundle into the 'dist/' folder
RUN npm run build

# Set runtime environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the API and Web server port
EXPOSE 3000

# Start the full-stack container using the TypeScript execution wrapper (tsx)
CMD ["npx", "tsx", "server.ts"]
