# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project (excluding what's in .dockerignore)
COPY . .

# Expose the port your backend runs on
EXPOSE 5000

# Start the application
CMD ["npm", "run", "dev"]