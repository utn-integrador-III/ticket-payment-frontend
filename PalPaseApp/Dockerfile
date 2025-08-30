# Use Node.js 18 as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install Expo CLI globally
RUN npm install -g @expo/cli

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose Expo development server port and metro bundler port
EXPOSE 8081 19000 19001 19002

# Set environment variables for Expo
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0

# Start Expo development server with tunnel for external access
CMD ["npx", "expo", "start", "--tunnel", "--non-interactive"]
