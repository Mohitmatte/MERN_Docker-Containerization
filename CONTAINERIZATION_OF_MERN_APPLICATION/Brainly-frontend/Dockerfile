FROM node:18.9.1

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Ensure files have execution permissions
RUN chmod -R 777 /app

# Expose the port used by Vite
EXPOSE 5173

# Start the Vite development server with correct host binding
CMD ["npm", "run", "dev"]
