# Use the official Node.js image
FROM node:16

# Create and set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Install a lightweight HTTP server to serve the app
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Create a script to update the runtime-config.js file with environment variables
COPY ./update-runtime-config.sh /app/update-runtime-config.sh
RUN chmod +x /app/update-runtime-config.sh

# Serve the app and update the runtime-config.js file at runtime
CMD ["/bin/sh", "-c", "/app/update-runtime-config.sh && serve -s build"]
