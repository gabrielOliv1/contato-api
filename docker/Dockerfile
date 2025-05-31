FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Set NODE_ENV to test
ENV NODE_ENV=test

# Expose port if needed
EXPOSE 3000

# Command will be overridden by docker-compose
CMD ["npm", "run", "test"] 